<template>
  <div>
    <div>
      <Row>
        <Dropdown style="margin-left: 20px"
          @on-click="addEvent"
        >
            <Button type="primary">
                Select an event to add
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="evt in events"
                :key="evt"
                v-text="evt"
                :name="evt"
              ></DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </Row>
    </div>
    <Row class="cards">
      <Col span="6" v-for="event in items" :key="event.id">
        <Card class="card">
          <a href="#" slot="extra" @click.prevent.once="deleteEvent(event.id)">
            x
          </a>
          <p slot="title">{{ event.type }}</p>
          <p>{{ moment(event.added) }}</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import firestore from './firestore';
import moment from 'moment';
import orderBy from 'lodash/orderBy';

export default {
  data () {
    return {
      events: ['EVENT_ONE', 'EVENT_TWO', 'EVENT_THREE'],
      fetchedEvents: [],
    }
  },
  name: 'Emitter',
  mounted() {
    firestore.collection('events')
      .onSnapshot(snapshot => {
        let items = this.fetchedEvents;
        snapshot.docChanges().forEach(item => {
          const { id } = item.doc;
          if (item.type === 'added') {
            items.push({ ...item.doc.data(), id })
          } else if (item.type === 'removed') {
            items = items.filter(i => i.id !== id)
          }
        })
        this.fetchedEvents = items
      });
  },
  methods: {
    addEvent(event) {
      firestore.collection('events').add({
        type: event,
        value: Math.random() * 100,
        added: moment().format('x')
      })
    },
    guerySnapshot(querySnapshot) {
      querySnapshot.forEach(doc => {
        this.$Notice.open({
          title: doc.data().type,
          desc: doc.id
        });
      });
    },
    deleteEvent(eventId) {
      firestore.collection('events').doc(eventId).delete()
    },
    moment(date) {
      return moment(date, 'x').format('mm:hh:ss')
    }
  },
  computed: {
    items() {
      return orderBy(this.fetchedEvents, 'added', 'desc')
    }
  }
}
</script>

<style>
.cards {
  margin-top: 20px;
}
</style>
