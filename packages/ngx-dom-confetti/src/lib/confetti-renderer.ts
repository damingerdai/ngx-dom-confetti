import { ConfettiConfig, defaultsConfettiConfig } from './config';

interface IPhysics {
  x: number;
  y: number;
  z: number;
  wobble: number;
  wobbleSpeed: number;
  velocity: number;
  angle2D: number;
  angle3D: number;
  tiltAngle: number;
  tiltAngleSpeed: number;
}

interface IFetti {
  element: HTMLDivElement,
  physics: IPhysics
}

export class ConfettiRenderer {

  constructor(private _document: Document) { }

  private createElements(
    elementCount: number,
    colors: string[],
    width: string,
    height: string
  ): {
    fragment: DocumentFragment,
    elements: HTMLDivElement[]
  } {
    const fragment = this._document.createDocumentFragment();
    const elements = Array.from({ length: elementCount }).map((_, index) => {
      const element = this._document.createElement('div');
      const color = colors[index % colors.length];
      element.style.backgroundColor = color;
      element.style.width = width;
      element.style.height = height;
      element.style.position = 'absolute';
      element.style.willChange = 'transform, opacity';
      element.style.visibility = 'hidden';
      fragment.appendChild(element);
      return element;
    });

    return {
      fragment,
      elements,
    };
  }

  private randomPhysics(
    angle: number,
    spread: number,
    startVelocity: number,
    random: () => number
  ): IPhysics {
    const radAngle = angle * (Math.PI / 180);
    const radSpread = spread * (Math.PI / 180);
    return {
      x: 0,
      y: 0,
      z: 0,
      wobble: random() * 10,
      wobbleSpeed: 0.1 + random() * 0.1,
      velocity: startVelocity * 0.5 + random() * startVelocity,
      angle2D: -radAngle + (0.5 * radSpread - random() * radSpread),
      angle3D: -(Math.PI / 4) + random() * (Math.PI / 2),
      tiltAngle: random() * Math.PI,
      tiltAngleSpeed: 0.1 + random() * 0.3,
    };
  }

  private updateFetti(fetti: IFetti, progress: number, dragFriction: number, decay: number) {
     
    fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
    fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
    fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
    fetti.physics.wobble += fetti.physics.wobbleSpeed;
    // Backward compatibility
    if (decay) {
      fetti.physics.velocity *= decay;
    } else {
      fetti.physics.velocity -= fetti.physics.velocity * dragFriction;
    }
    fetti.physics.y += 3;
    fetti.physics.tiltAngle += fetti.physics.tiltAngleSpeed;

    const { x, y, z, tiltAngle, wobble } = fetti.physics;
    const wobbleX = x + 10 * Math.cos(wobble);
    const wobbleY = y + 10 * Math.sin(wobble);
    const transform = `translate3d(${wobbleX}px, ${wobbleY}px, ${z}px) rotate3d(1, 1, 1, ${tiltAngle}rad)`;

    fetti.element.style.visibility = "visible";
    fetti.element.style.transform = transform;
    fetti.element.style.opacity = (1 - progress).toString();;
     
  }

  private animate(root: HTMLElement, fettis: IFetti[], dragFriction: number, decay: number, duration: number, stagger: number) {
    let startTime: number;
    let isActive = true;

    const update = (time: number) => {
      if (!isActive) return;

      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = startTime === time ? 0 : (time - startTime) / duration;
      fettis.slice(0, Math.ceil(elapsed / stagger)).forEach(fetti => {
        this.updateFetti(fetti, progress, dragFriction, decay);
      });

      if (time - startTime < duration) {
        requestAnimationFrame(update);
      } else {
        fettis.forEach((fetti) => {
          if (fetti.element.parentNode === root) {
            root.removeChild(fetti.element);
          }
        })

        isActive = false;
      }
    }

    requestAnimationFrame(update);

    return new Promise<void>(resolve => {
      const checkIfDone = setInterval(() => {
        if (!isActive) {
          clearInterval(checkIfDone);
          resolve();
        }
      }, 100);
    });
  }

  public launch(root: HTMLElement, config?: Partial<ConfettiConfig>): Promise<void> {
    const {
      elementCount,
      colors,
      width,
      height,
      perspective,
      angle,
      spread,
      startVelocity,
      decay,
      dragFriction,
      duration,
      stagger,
      random,
    } = { ...defaultsConfettiConfig, ...config } as ConfettiConfig;
    root.style.perspective = perspective;
    const { fragment, elements } = this.createElements(
      elementCount ?? 50,
      colors,
      width,
      height
    );
    root.appendChild(fragment);
    const fettis = elements.map((element) => ({
      element,
      physics: this.randomPhysics(angle, spread, startVelocity, random),
    }));

    return this.animate(root, fettis, dragFriction, decay, duration, stagger);
  }
}
