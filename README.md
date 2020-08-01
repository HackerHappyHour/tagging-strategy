# Image Tagger 

---
**NOTE:** docs below are currently an implementation guide. Listed features are
not yet available.
---

A github image for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

Use with [Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

- [Image Tagger](#image-tagger)
  - [not yet available.](#not-yet-available)
  - [Usage](#usage)
    - [Inputs](#inputs)
      - [Strategies](#strategies)

## Usage

```yaml
jobs:
  docker_image:
    runs-on: ubuntu-latest
    stategy:
      matrix:
        image-tagger-patterns: ['latest', 'OS', 'X', 'X.Y', 'X.Y.Z',]

    steps:
    # checkout steps etc...

    # Image Tagger
    - name: Image Tag Strategy
      id: tag-strategy
      uses: HackerHappyHour/image-tagger@v1
      if: ${{ github.event_name == 'release' }}
      with:
        pattern: ${{ matrix.image-tagger-patterns }}
    - name: Setup Buildx
      id: setup
      uses: crazy-max/ghaction-docker-buildx@v3

    - name: Build
      run: |
        docker buildx build -t ${{ github.repo }}:${{ steps.tag-strategy.output.tag }} .
```

### Inputs

| Name             | Type    | Required   | Description                        |
|------------------|---------|------------|------------------------------------|
| `pattern`        | [Strategy](#strategies) | yes | The strategy to parse the tag paylod with |
| `payload_key` | String | no | They payload key used as a lookup for pattern parsing |

#### Strategies

Use `%` for strategy variables when using a combination strategy. If given
a string without `%`, the parser will infer the `%` surrounds the given string.

All keys are accessd via the `github.event` context. The keys listed below can be
overriden by providing a value to the `payload_key` input. 

Any string that is not deliminated with `%` will be used as a literal value
and passed through to the output.

**Supported Strategy Variables**
| Strategy | produces | Default Lookup Key |
| -------- | ------ | ---------------------------- |
| `latest` | `latest` | `github.event.*.tag` |
| `X` | Major version | `github.event.*.tag` |
| `X.Y` | Major and Minor Version | `github.event.*.tag` |
| `X.Y.Z` | | `github.event.*.tag` |

**Examples**

```yaml
image-trigger-patterns: ['%X%-buster', '%X.Y%-buster']
```
