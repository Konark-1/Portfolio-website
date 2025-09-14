# Button Update Plan

## Overview
This document outlines the plan to replace the older version of buttons with the current design while retaining the text content from the current website. The buttons are located in the `ProjectsTabs` component in `Portfolio-website-master/src/app/page.tsx`.

## Current State Analysis

### Current Version (src/app/page.tsx)
- Text labels: "Adaptive Visuals", "Macro and Micro level Analysis", "Distribution and Trend Analysis"
- Descriptions: "Distribution and Trend Analysis", "Macro and Micro level Analysis", "Adaptive Visuals"
- Styling: Complex with transitions, scaling effects, and blur effects
- Additional styling for hover and active states with background colors and borders

### Older Version (Portfolio-website-master/src/app/page.tsx)
- Text labels: "Cinematic", "Seamless", "Consistent"
- Descriptions: "Bring your own assets, or generate them. Then manage and reference them as you build.", "An interface designed for creative, iterative story-building — from ideation to iteration.", "State-of-the-art visuals presented beautifully. Interactive PowerBI dashboard showcasing advanced analytics."
- Styling: Simple with basic blur effects

## Changes to Implement

### 1. Update Text Content
Replace the text labels and descriptions in the older version with those from the current version:

#### Text Labels
- "Cinematic" → "Adaptive Visuals"
- "Seamless" → "Macro and Micro level Analysis"
- "Consistent" → "Distribution and Trend Analysis"

#### Descriptions
- "Bring your own assets, or generate them. Then manage and reference them as you build." → "Distribution and Trend Analysis"
- "An interface designed for creative, iterative story-building — from ideation to iteration." → "Macro and Micro level Analysis"
- "State-of-the-art visuals presented beautifully. Interactive PowerBI dashboard showcasing advanced analytics." → "Adaptive Visuals"

### 2. Update Button Styling
Replace the simple styling with the complex styling from the current version:

#### Current Styling (to be applied)
```jsx
<h3
  key={key}
  onMouseEnter={() => setHoverTab(key)}
  onMouseLeave={() => setHoverTab(null)}
  onClick={() => setActiveTab(key)}
  className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold cursor-pointer select-none text-center
    transition-all duration-300 ease-in-out
    ${isDisplayed ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}
    ${isDisplayed ? 'filter-none' : 'blur-[4px] sm:blur-[8px]'}
    py-2 px-4 rounded-lg w-full sm:w-auto
    ${isDisplayed ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 hover:bg-white/8'}
    shadow-md
  `}
 style={{ 
    fontSize: 'clamp(0.875rem, 1rem, 2.5rem)' 
  }}
>
  {label}
</h3>
```

#### Current Styling Details
- Font sizes: `text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`
- Font weight: `font-bold`
- Cursor: `cursor-pointer`
- Selection: `select-none`
- Text alignment: `text-center`
- Transitions: `transition-all duration-300 ease-in-out`
- Opacity and scaling: `${isDisplayed ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}`
- Blur effects: `${isDisplayed ? 'filter-none' : 'blur-[4px] sm:blur-[8px]'}`
- Padding: `py-2 px-4`
- Rounded corners: `rounded-lg`
- Width: `w-full sm:w-auto`
- Background and borders: `${isDisplayed ? 'bg-white/10 border border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/8'}`
- Shadow: `shadow-md`
- Font size clamp: `fontSize: 'clamp(0.875rem, 1rem, 2.5rem)'`

### 3. Update Container Structure
Update the container structure to match the current version:

#### Current Container Structure
```jsx
<div className="ml-[calc(50%-50vw)] w-screen">
  <div className="border-t border-white/15 bg-gradient-to-b from-white/5 via-white/0 to-transparent">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4 sm:gap-4">
      {/* Buttons here */}
    </div>
  </div>
</div>
```

### 4. Update Description Styling
Update the description styling to match the current version:

#### Current Description Styling
```jsx
<p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-300 max-w-3xl mx-auto text-center px-4 leading-relaxed">
  {descriptionByTab[activeTab]}
</p>
```

## Implementation Steps

1. Update the `tabs` array with new text labels
2. Update the `descriptionByTab` object with new descriptions
3. Replace the button rendering code with the current version's styling
4. Update the container structure to match the current version
5. Update the description rendering to match the current version

## Verification
After implementation, verify that:
1. Text content matches the current version
2. Styling matches the current version
3. Functionality is preserved
4. Responsive behavior is maintained