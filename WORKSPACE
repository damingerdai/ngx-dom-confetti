load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_bazel_lib",
    sha256 = "3534a27621725fbbf1d3e53daa0c1dda055a2732d9031b8c579f917d7347b6c4",
    strip_prefix = "bazel-lib-1.16.1",
    url = "https://github.com/aspect-build/bazel-lib/archive/refs/tags/v1.16.1.tar.gz",
)

load("@aspect_bazel_lib//lib:repositories.bzl", "aspect_bazel_lib_dependencies")

aspect_bazel_lib_dependencies()

http_archive(
    name = "aspect_rules_js",
    sha256 = "dda5fee3926e62c483660b35b25d1577d23f88f11a2775e3555b57289f4edb12",
    strip_prefix = "rules_js-1.6.9",
    url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v1.6.9.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = "16.17.1",
)


load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
    npmrc = "//:.npmrc",
    verify_node_modules_ignored = "//:.bazelignore",
    patches = {
      "@angular-devkit/architect-cli": ["//:tools/patches/bazel-architect-cli.patch"],
    },
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()
