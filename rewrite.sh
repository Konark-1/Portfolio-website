#!/bin/bash
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --msg-filter '
msg=$(cat)
msg="${msg//Ballu Baal/Configure Next.js and Tailwind framework}"
msg="${msg//mob opt/Mobile performance optimizations}"
msg="${msg//yum/Update package dependencies}"
msg="${msg//BASE FRAMEWORK/Initialize Tailwind CSS configuration}"
msg="${msg//new website/Initialize Next.js application}"
msg="${msg//new hero/Update hero section component}"
msg="${msg//Done/Configure TypeScript settings}"
msg="${msg//resume updated/Update resume PDF}"
echo "$msg"
' HEAD
