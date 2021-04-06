<template>
<div class="containerfluid">
    <div class="row">
      <div class="col s3 m3">
        <button class="btn btn-primary" v-on:click="subscribe">
          connect
        </button>
        <button class="btn btn-secondary" v-on:click="disconnect">disonnect</button>
      </div>
      <div class="col s9 m9" v-bind:class="classObject">
        {{ connectedStatus }}
      </div>
    </div>
    <div class="row">
        <div class="col s12 m12">
            <h4>Equities</h4>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th class="left-align">Company Name</th>
                    <th class="left-align">Ticker</th>
                    <th class="left-align">Industry</th>
                    <th class="right-align">3-year EPS Growth Rate</th>
                    <th class="right-align">ESG Rating</th>
                    <th class="right-align">Sentiment Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data.stocks"
                    v-bind:key="item.Rank">
                    <td class="left-align">{{ item.Company }}</td>
                    <td class="left-align">{{ item.Ticker }}</td>
                    <td class="left-align">{{item.Industry}}</td>
                    <td class="right-align">
                      {{ item["3-Year EPS Growth Rate"] }}
                    </td>
                    <td v-if="changeRat(item.Ticker)" class="right-align">
                      {{rating}}
                      {{updateRat(item.Rank)}}
                    </td>
                    <td v-else class="right-align">
                      {{ item["ESG Rating"] }}
                    </td>
                    <td v-if="changeSent(item.Ticker)" class="right-align">
                      {{rating}}
                      {{updateSent(item.Rank)}}
                    </td>
                    <td v-else class="right-align">
                      {{ item["EPS Rating"] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
    </div>
</div>
</template>

<script>

import solace from 'solclientjs';
import { data } from '../data.js'
import TopicSubscriber from '../services/TopicSubscriber'

var factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProfiles.version10;
solace.SolclientFactory.init(factoryProps);

// enable logging to JavaScript console at WARN level
// NOTICE: works only with ('solclientjs').debug
solace.SolclientFactory.setLogLevel(solace.LogLevel.WARN);

export default {
  name: 'Esg',
  data () {
    return  {
      data,
      connectStatus: "Not connected",
      subscriber: {},
      rating: "AA",
      topic: ""
    }
  },
  computed: {
    connectedStatus() {
        return this.connectStatus;
    },
    classObject: function () {
      return {
        connected: this.connectStatus.includes("==="),
        disconnect: this.connectStatus.includes("***")
      }
    }
  },
  async created() {
      // create the subscriber, specifying the name of the subscription topic
      this.subscriber = new TopicSubscriber(solace, 'sri/data/>', (string) => {
        this.connectStatus = string;
      },
      (message, topic) => {
        this.rating = message;
        this.topic = topic;
      });
  },
  methods: {
    subscribe() {
      this.subscriber.run();
    },
    disconnect() {
      this.subscriber.exit();
    },
    changeRat(ticker) {
        if (this.topic.includes('rating')) {
          return this.topic.includes(ticker.toLowerCase());
        }
        return false;       
    },
    updateRat(rank) {
      data.stocks[rank-1]['ESG Rating'] = this.rating;
    },
    changeSent(ticker) {
        if (this.topic.includes('sentiment')) {
          return this.topic.includes(ticker.toLowerCase());
        }
        return false;       
    },
    updateSent(rank) {
      data.stocks[rank-1]['EPS Rating'] = this.rating;
    }
  }
}
</script>

<style scoped>
.disconnect {
  color: red
}
.connected {
  color: green
}
</style>