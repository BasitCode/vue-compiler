<template>
    <div>
        <input type="button" @click="Increment()" value="Increment">
        <label> count: {{ count }} </label>
    </div>
</template>

<script>
export default {
    data () {
        return {
            count: 0
        }
    },
    methods: {
        Increment () {
            this.count++
        }
    }
}
</script>

<style>
    input {
        border-radius: 12px;
    }

    label {
        font-size: 24px;
    }
</style>
