import { defineComponent } from 'vue'

export default defineComponent({

  setup () {
    const render = () => {
      return (
        <svg
          className="mySvg"
          width="30"
          height="30"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 12V36"
            stroke={'var(--text-normal)'}
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32 12V36"
            stroke={'var(--text-normal)'}
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
