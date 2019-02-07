---
templateKey: 'blog-post'
title: 'Using Source Control for Vivado Projects'
date: 2019-02-07
description: >-
    How to put Vivado projects under source control the right way.
tags:
  - Xilinx
  - Vivado
published: false
---
If one attempts to put a Vivado project under source control used by multiple people, it quickly becomes apparent that Vivado project files were designed to be used on one central development and build PC, and do not work well when being developed on multiple PCs simultaneously. The .xpr project file changes whenever IP output products are generated, and whenever there is a synthesis or implementation build. There is even an absolute directory path of the project file's location. This means that the project file changes every time it is opened by a different PC or user. In a modern development environment, this is far from ideal.

There are also multiple folders generated in a Vivado project, each containing multiple files. Which files should we put in source control? The answer: none of them!

##
