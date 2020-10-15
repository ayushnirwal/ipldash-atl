<script>
import {HorizontalBar } from 'vue-chartjs'

export default {
name:"Bar",
    extends: HorizontalBar,
    props: ['chartdata', 'options'],
    mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>

</style>