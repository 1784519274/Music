import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const render = () => {
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
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
