<template>
    <div class="nfl-calendar">
        <div class="games">
            <div v-for="(score, i) in scores" :key="i" class="game">
                <div>
                    <span> {{score._attributes.d}}</span>
                    <span> {{score._attributes.t}}</span>
                </div>
                <div>{{score._attributes.hnn}}</div>
                <div>vs</div>
                <div>{{score._attributes.vnn}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import convert from "xml-js";

export default {
  name: "NflCalendar",
  data() {
    return {
      data: null,
      scores: null
    };
  },
  methods: {
    fetchScores() {
      axios
        .get(
          "http://www.nfl.com/ajax/scorestrip?season=2018&seasonType=REG&week=1"
        )
        .then(res => {
          this.data = convert.xml2json(res.data, { compact: true, spaces: 4 });
          this.scores = JSON.parse(this.data).ss.gms.g;
          console.log(this.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {},
  created() {
    this.fetchScores();
  }
};
</script>

<style>
.nfl-calendar {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 200px;
  background-image: linear-gradient(
    to bottom,
    rgba(31, 48, 59, 0.1),
    rgba(31, 48, 59, 0.7)
  );
  text-align: left;
  font-size: 0.8em;
}

.games {
    display: flex;
}

.game{
    flex-grow: 1;
    padding: 10px;
}
</style>
