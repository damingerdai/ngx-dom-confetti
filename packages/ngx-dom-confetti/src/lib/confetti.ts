/**
 * License MIT, copyright Daniel Lundin 2019
 */

export interface ConfettiConfig {
    angle: number;
    spread: number;
    width: string;
    height: string;
    perspective: string;
    duration: number;
    dragFriction: number;
    stagger: number;
    startVelocity: number;
    elementCount: number;
    decay: number;
    colors: string[];
    random: () => number;
}

const defaultColors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"];

export const defaultsConfettiConfig = {
    angle: 90,
    spread: 45,
    startVelocity: 45,
    elementCount: 50,
    width: "10px",
    height: "10px",
    perspective: "",
    colors: defaultColors,
    duration: 3000,
    stagger: 0,
    dragFriction: 0.1,
    random: Math.random
}

function createElements(root: HTMLElement, elementCount: number, colors: string[], width: string, height: string) {
    const fragment = document.createDocumentFragment();
    const element =  Array.from({ length: elementCount }).map((_, index) => {
        const element = document.createElement("div");
        const color = colors[index % colors.length];
        element.style.backgroundColor = color;
        element.style.width = width;
        element.style.height = height;
        element.style.position = "absolute";
        element.style.willChange = "transform, opacity";
        element.style.visibility = "hidden";
        fragment.appendChild(element);
        return element;
    });
    root.appendChild(fragment);

    return element;
}

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

function randomPhysics(angle: number, spread: number, startVelocity: number, random: () => number): IPhysics {
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
        tiltAngleSpeed: 0.1 + random() * 0.3
    };
}

function animate(root: HTMLElement, fettis: Array<IFetti>, dragFriction: number, decay: number, duration: number, stagger: number) {
    let startTime: number;

    return new Promise<void>(resolve => {
        function update(time: number) {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const progress = startTime === time ? 0 : (time - startTime) / duration;
            fettis.slice(0, Math.ceil(elapsed / stagger)).forEach(fetti => {
                updateFetti(fetti, progress, dragFriction, decay);
            });

            if (time - startTime < duration) {
                requestAnimationFrame(update);
            } else {
                const fetti = fettis.find((fetti) => fetti.element.parentNode === root);
                if (fetti) {
                    root.removeChild(fetti.element);
                }
                resolve();
            }
        }

        requestAnimationFrame(update);
    });
}

function updateFetti(fetti: IFetti, progress: number, dragFriction: number, decay: number) {
    /* eslint-disable no-param-reassign */
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

    /* eslint-enable */
  }

export function confetti(root: HTMLElement, config?: Partial<ConfettiConfig>): Promise<void> {
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
        random
    } = { ...defaultsConfettiConfig, ...config } as ConfettiConfig;
    root.style.perspective = perspective;
    const elements = createElements(root, elementCount ?? 50, colors, width, height);
    const fettis = elements.map(element => ({
        element,
        physics: randomPhysics(angle, spread, startVelocity, random)
    }));

    return animate(root, fettis, dragFriction, decay, duration, stagger);
}
