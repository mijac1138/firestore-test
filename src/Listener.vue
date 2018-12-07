<template>
  <h1>Stay awhile and listen!</h1>
</template>

<script>
import firestore from './firestore';
import moment from 'moment';
let unsubscribe = null;
let unsubscribeDelete = null;

export default {
  data () {
    return {
      initDate: moment().format('x'),
      events: ['EVENT_ONE', 'EVENT_TWO', 'EVENT_THREE'],
      fetchedEvents: [],
    }
  },
  name: 'Listener',
  mounted() {
    unsubscribe = firestore.collection('events').where('added', '>', this.initDate)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(item => {
          console.log(item);
          const data = item.doc.data();
          if (item.type === 'added') {
            this.$Notice.success({
              title: data.type,
              desc: 'Added event!'
            });
          } else if (item.type === 'removed') {
            this.$Notice.warning({
              title: data.type,
              desc: 'Added removed!'
            });
          }
        })
      });
      unsubscribeDelete = firestore.collection('events')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(item => {
            if (item.type === 'removed') {
              const data = item.doc.data();
              this.$Notice.warning({
                title: data.type,
                desc: 'Removed event!'
              });
            }
          })
        });
  },
  beforeDestroy() {
    unsubscribe && unsubscribe();
    unsubscribeDelete && unsubscribeDelete();
  }
}
</script>

<style>
.cards {
  margin-top: 20px;
}
</style>
