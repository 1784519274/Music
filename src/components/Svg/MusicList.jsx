import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const render = () => {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 19H40"
            stroke={'var(--text-normal)'}
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24 10H40"
            stroke={'var(--text-normal)'}
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 38H40"
            stroke={'var(--text-normal)'}
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 28H40"
            stroke={'var(--text-normal)'}
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 10L16 15L8 20V10Z"
            fill="none"
            stroke={'var(--text-normal)'}
            stroke-width="4"
            stroke-linejoin="round"
          />
        </svg>
      )
    }

    return render
  }
})
