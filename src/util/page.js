export const backTop = (timer, top = 0) => {
  timer = setInterval(() => {
    const backTop = document.getElementById('App-Wrapper').scrollTop
    const speedTop = backTop * 0.05 + 20
    document.getElementById('App-Wrapper').scrollTop = backTop - speedTop
    if (backTop <= top) {
      clearInterval(timer)
    }
  }, 0)
}
