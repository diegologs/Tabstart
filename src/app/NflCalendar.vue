<template>
    <div class="nfl-calendar">
        <div>
            <span>Week {{week}}, </span>
            <span>{{getTypeName}} </span>
            <span>{{year}}</span>
        </div>
        <div class="games">
            <div class="arrow" @click="prevScores()">◀</div>
            <div v-for="(score, i) in scores" :key="i" class="game">
                <div class="game-info">
                    <div>
                        <span> {{score._attributes.d}}</span>
                        <span> {{score._attributes.t}}</span>
                    </div>
                    <div>{{score._attributes.hnn}}</div>
                    <div>vs</div>
                    <div>{{score._attributes.vnn}}</div>
                </div>
            </div>
            <div class="arrow" @click="nextScores()">▶</div>
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
      scores: null,
      week: 1,
      type: "PRE",
      year: 2018
    };
  },
  methods: {
    fetchScores(year, week, type) {
      axios
        .get(
          "http://www.nfl.com/ajax/scorestrip?season=" +
            year +
            "&seasonType=" +
            type +
            "&week=" +
            week
        )
        .then(res => {
          this.data = convert.xml2json(res.data, { compact: true, spaces: 4 });
          this.scores = JSON.parse(this.data).ss.gms.g;
          console.log(this.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    nextScores() {
      this.week++;
      if (this.week > 4 && this.type == "PRE") {
        this.week = 1;
        this.type = "REG";
      }
      this.fetchScores(new Date().getFullYear(), this.week, this.type);
    },

    prevScores() {
      this.week--;
      if (this.week < 1 && this.type == "REG") {
        this.week = 1;
        this.type = "PRE";
      }
      this.fetchScores(new Date().getFullYear(), this.week, this.type);
    }
  },
  computed: {
    getTypeName() {
      switch (this.type) {
        case "PRE":
          return "Preseason";
        case "REG":
          return "Regular season";
      }
    }
  },
  created() {
    this.fetchScores(new Date().getFullYear(), this.week, this.type);
  }
};
</script>

<style lang="scss">
.nfl-calendar {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 100px;
  background-image: linear-gradient(
    to bottom,
    rgba(31, 48, 59, 0.2),
    rgb(9, 20, 27)
  );
  text-align: left;
  font-size: 0.8em;
}

.games {
  display: flex;
}

.game {
  flex-grow: 1;
  padding: 10px;
}

.arrow {
  width: 2%;
  padding-top: 40px;
  text-align: center;
  cursor: pointer;
  &:hover{
      background-color: rgba(255, 255, 255, 0.1);
  }
}

.game-info {
  margin: 0px auto;
  text-align: center;
}
</style>
