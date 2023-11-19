#!/usr/bin/env python3

from aws_cdk import core

from cdk_tut.cdk_tut_stack import CdkTutStack

environment = core.Environment(region="ap-southeast-1")

app = core.App()
CdkTutStack(app, "cdk-tut", env=environment)

app.synth()
