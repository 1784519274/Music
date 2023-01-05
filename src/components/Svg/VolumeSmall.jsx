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
            d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
            fill="none"
            stroke={'var(--text-accent)'}
            stroke-width="4"
            stroke-linejoin="round"
          />
        </svg>
      )
    }

    return render
  }
})
