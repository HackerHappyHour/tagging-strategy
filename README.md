# Tagging Strategy

---
**NOTE:** docs below are currently an implementation guide. Listed features are
not yet available.
---

A github image for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

Use with [Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

- [Tagging Strategy](#tagging-strategy)
  - [not yet available.](#not-yet-available)
  - [Usage](#usage)
    - [Inputs](#inputs)
    - [Outputs](#outputs)

## Usage

```yaml
jobs:
  docker_image:
    runs-on: ubuntu-latest
    stategy:
      matrix:
        image-tagger-patterns: ['%X%-foobar', '%X.Y%-foobar', '%X.Y.Z%-foobar']

    steps:
    # checkout steps etc...

    # Image Tagger
    - name: Image Tag Strategy
      id: tagging
      uses: HackerHappyHour/tagging-strategy@v1
      if: ${{ github.event_name == 'release' }}
      with:
        pattern: ${{ matrix.image-tagger-patterns }}
        tag_name: ${{ github.ref }}
    - name: Setup Buildx
      id: setup
      uses: crazy-max/ghaction-docker-buildx@v3

    - name: Build
      run: |
        docker buildx build -t ${{ github.repo }}:${{ steps.tagging.outputs.tag }} .
```

### Inputs

| Name             | Type    | Required   | Description                        |
|------------------|---------|------------|------------------------------------|
| `pattern`        | [Strategy](#strategies) | yes | The strategy to parse the tag paylod with |
| `tag_name` | String | no | They payload key used as a lookup for pattern parsing |

### Outputs

| Name             | Type    | Description |
|------------------|---------|-------------|
| `tag` | `String` | The transformed tag |
