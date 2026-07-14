# Workflow 2 — Build a Docker image and push it to AWS ECR

**Goal:** Use **marketplace actions** to build the Docker image for the app in this
branch and push it to **Amazon ECR**, authenticating with **secrets and variables** you
configure on the repository.

## The app

A tiny **Node + Express** "Taskboard": a web UI where you can add, toggle, and delete
tasks (backed by in-memory REST endpoints). It's already Dockerized for you.

Run it locally without Docker:

```bash
npm install
npm start
# open http://localhost:3000
```

Or with Docker:

```bash
docker build -t taskboard .
docker run --rm -p 3000:3000 taskboard
# open http://localhost:3000
```

## What you'll build

A workflow at `.github/workflows/second.yml` that, on `workflow_dispatch` (and/or push),
builds this image and pushes it to ECR using these marketplace actions:

- `actions/checkout`
- `aws-actions/configure-aws-credentials` — authenticate with your AWS keys
- `aws-actions/amazon-ecr-login` — get a Docker login to your ECR registry
- `docker/setup-buildx-action`
- `docker/build-push-action` — build and push in one step

## Secrets & variables to configure

In **Settings → Secrets and variables → Actions**:

**Secrets** (encrypted):
| Name                    | Value                          |
| ----------------------- | ------------------------------ |
| `AWS_ACCESS_KEY_ID`     | IAM access key id              |
| `AWS_SECRET_ACCESS_KEY` | IAM secret access key          |

**Variables** (plain):
| Name             | Example                         |
| ---------------- | ------------------------------- |
| `AWS_REGION`     | `eu-central-1`                  |
| `ECR_REPOSITORY` | `gh-actions-session/taskboard`  |

> The IAM user needs ECR permissions (e.g. `AmazonEC2ContainerRegistryPowerUser`), and
> the ECR repository (`ECR_REPOSITORY`) must already exist in that region.

## Concepts covered

- Consuming marketplace actions and pinning versions
- Repository **secrets** vs **variables** and reading them with
  `${{ secrets.* }}` / `${{ vars.* }}`
- Building and pushing a Docker image from CI
- Authenticating to a cloud registry (ECR)

## Reference

- [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
- [aws-actions/amazon-ecr-login](https://github.com/aws-actions/amazon-ecr-login)
- [docker/build-push-action](https://github.com/docker/build-push-action)
