<template>
  <svg
    width="88"
    height="88"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 19H43V41C43 42.1046 42.1046 43 41 43H7C5.89543 43 5 42.1046 5 41V19Z"
      fill="none"
      stroke="var(--text-bright)"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M5 10C5 8.89543 5.89543 8 7 8H41C42.1046 8 43 8.89543 43 10V19H5V10Z"
      stroke="var(--text-bright)"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <text id="txt" x="19" y="37" fill="var(--text-bright)">
      {{ num }}
    </text>
    <path
      d="M16 5V13"
      stroke="var(--text-bright)"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M32 5V13"
      stroke="var(--text-bright)"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
const num = new Date().getDay() + 1
</script>
