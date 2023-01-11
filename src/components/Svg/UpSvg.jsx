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
            d="M13 30L25 18L37 30"
            stroke="var(--text-normal)"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )
    }

    return render
  }
})
