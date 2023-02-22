# Backstage

[![main](https://github.com/analect-io/backstage/actions/workflows/main.yml/badge.svg)](https://github.com/analect-io/backstage/actions/workflows/main.yml)
[![Quality Gate Status](https://sonar.analect.com/api/project_badges/measure?project=backstage&metric=alert_status&token=6b826098cc984faf7c32b5f980fc84ac0e3b2880)](https://sonar.analect.com/dashboard?id=backstage)
[![App Status](https://argocd.analect.com/api/badge?name=prd-backstage&revision=true)](https://argocd.analect.com/applications/prd-backstage)

## Backstage - IDP

## Environments you need before start

| Name                      | Where to get?                                                                                                   |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| GITHUB_ACCESS_TOKEN       | Generate a new personal access token in [GIthub Secure page](https://github.com/settings/tokens)                |
| AUTH_GITHUB_CLIENT_ID     | Get in [Github app ID](https://github.com/organizations/analect-io/settings/applications/1927877)             |
| AUTH_GITHUB_CLIENT_SECRET | Open a tiket to analect to share this value                                                                       |
| SONARQUBE_TOKEN           | Create a `Sonarqube` token using this [documentation](https://docs.sonarqube.org/latest/user-guide/user-token/) |

All environments above `MUST` be exported in your bash context like below:

```sh
# .bashrc or .zshrc
export GITHUB_ACCESS_TOKEN='YOUR-TOKEN-HERE'
export AUTH_GITHUB_CLIENT_ID='YOUR-TOKEN-HERE'
export AUTH_GITHUB_CLIENT_SECRET='YOUR-TOKEN-HERE'
export SONARQUBE_TOKEN='YOUR-TOKEN-HERE'
```

## Setup your hosts

You'll need to create an entry to your `/etc/hosts` to specify `backstage.local` like below:

```sh
# /etc/hosts

# ...
127.0.0.1 backstage.local
#...

```

## Start project

You'll need `Docker` and `docker-compose` installed before you continue!

Once all you need is in your bash context, just run the commands below:

```sh
docker-compose run --rm app yarn # to install node_modules
docker-compose up -d app # to up the backstage application
```

Backstage in develop mode will be available in <http://backstage.local:3000> and it's using `GitHub SSO integration`


## 🚦 Work Flux

```mermaid
graph TD;
    Dev-->Backstage;
    Backstage--create-->analect-app;
    analect-app-->golang;
    analect-app-->python;
    analect-app-->node;
    golang--new-app-->backstage-catalog;
    backstage-catalog--fetch-->github/analect-io/template-golang;
    backstage-catalog--fetch-->kubernetes-skelleton;
    backstage-catalog--push-->github/analect-io/new-app;
    kubernetes-skelleton--PullRequest-->ArgoCD;
    github/analect-io/new-app--workflow-->analect-io/.github/workflows;
    ArgoCD--pull-->helm-charts/analect-app;
    ArgoCD--deploy-->Kubernetes;
    analect-io/.github/workflows--push/docker-image-->ghcr.github.com/analect-io;
    Kubernetes--pull/docker-image-->ghcr.github.com/analect-io;
    Kubernetes-->new-app;
```

## 🧩 References 

- [ArgoCD](https://github.com/analect-io/gitops)
- [helm-charts](https://github.com/analect-io/helm-charts)
- [Backstage](https://github.com/analect-io/backstage)
- [backstage-catalog:](https://github.com/analect-io/backstage-catalog)
- [template-golang](https://github.com/analect-io/template-golang)
- [github-workflows](https://github.com/analect-io/.github)


## ✨ Contributions

We ❤️ contributions big or small. [See our guide](contributing.md) on how to get started.

### Thanks to all our contributors!

<a href="https://github.com/analect-io/backstage/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=analect/backstage" />
</a>

Made with 💜 by DevXP-Tech.
