<template>
  <div class="gitask" id="gitalk-container">
  </div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
  name: 'gitask',
  data () {
    return {

    }
  },
  mounted () {
    // issues的长度在50字以内，如果超过就会显示`Error: Validation Failed`
    const gitalk = new Gitalk({
      clientID: '04d6cd9fea245bed44dd',
      clientSecret: '678d5db4c2e5db3200238b18fcc787f4e0bac398',
      repo: 'blog',
      owner: '0227vera',
      admin: ['0227vera'],
      id: decodeURI(location.pathname),      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
  }
}
</script>
