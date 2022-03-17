---
title: Getting started
weight: 75
menu:
  docs:
    parent: "Monitoring-as-Code"
---

You can get started with Terraform on Checkly in a matter of minutes by following the steps shown below.

## Installation

To get started, you will need to install the latest version of [HashiCorp Terraform](https://www.terraform.io/downloads).

Next, switch to a new folder for your project, and create your `main.tf` file:

```terraform
terraform {
  required_providers {
    checkly = {
      source = "checkly/checkly"
      version = "1.4.3"
    }
  }
}

variable "checkly_api_key" {}
variable "checkly_account_id" {}

provider "checkly" {
  api_key = var.checkly_api_key
  account_id = var.checkly_account_id
}
```

To use the provider with your Checkly account, you will need an API Key for your Checkly user. Go to the [User Settings: API Keys page](https://app.checklyhq.com/settings/user/api-keys) and click 'Create API Key'. Get your User API Key and add it to your env:

```bash
$ export TF_VAR_checkly_api_key=cu_xxx
```

You also need to set your target Account ID, which you can find under your [account settings](https://app.checklyhq.com/settings/account/general). If you don't have access to account settings, please contact your account owner/admin.

```bash
$ export TF_VAR_checkly_account_id=xxx
```

Running `terraform init` will install the Checkly Terraform provider for you, as well as initialising your project. You can now start adding resources to your file. You can check the official documentation to see [available parameters](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/check) for each resource type. As an example, you could add a basic browser check resource at the bottom of your `main.tf`:

```terraform
resource "checkly_check" "browser-check-1" {
  name                      = "Example check"
  type                      = "BROWSER"
  activated                 = true
  frequency                 = 10
  double_check              = true
  locations = [
    "us-west-1"
  ]

  script = <<EOT
const assert = require("chai").assert;
const puppeteer = require("puppeteer");

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("https://google.com/");
const title = await page.title();

assert.equal(title, "Google");
await browser.close();

EOT
}
```

## Applying changes

After each change to your Terraform file, you will need to run the following two commands:
1. `terraform plan -out tf.plan` - to plan the necessary actions that Terraform will need to make.
2. `terraform apply "tf.plan"` - to apply the plan and have the changes reflected on Checkly.

If you are using [Terraform Cloud](https://www.terraform.io/cloud), the above will be run for you automatically every time a pull request is merged into the main branch.

{{<warning>}}
Checkly resources should be managed _either_ through Terraform _or_ through the Checkly UI, not both!
Modifying Terraform-managed resources via the UI, and viceversa, is likely to cause issues.
{{</warning>}}

## Additional material

We often publish in-depth articles on how to use Terraform with Checkly on our blog:
1. [Managing Checkly checks with Terraform](https://blog.checklyhq.com/managing-checkly-checks-with-terraform/)
2. [Scaling Puppeteer & Playwright on Checkly with Terraform](https://blog.checklyhq.com/scaling-puppeteer-playwright-on-checkly-with-terraform/)

## Troubleshooting common errors

>**Error: 402 payment required** If you find this error when creating checks through Terraform or the API, possibly you have reached the maximum number of checks you can create on your account. Contact Checkly Support to talk about options. 

