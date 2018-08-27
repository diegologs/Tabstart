<template>
  <div class="nfl-calendar">
    <div>
      <span class="arrow" @click="prevScores()">◀</span>
      <span v-if="type !== 'SB'">Week {{week}}, </span>
      <span>{{getTypeName}} </span>
      <span>{{year}}</span>
      <span class="arrow" @click="nextScores()">▶</span>

    </div>
    <div class="games">
      <div v-for="(score, i) in scores" :key="i" class="game">
        <div class="game-info">
          <div class="game-date">
            <small class="date"> {{score._attributes.d}}</small>
            <small class="date"> {{score._attributes.t}}</small>
            <br>
          </div>
          <div class="score-team">
            <img :src="'/icons/nfl/' + score._attributes.hnn + '.png'" class="image" />
            <div v-if="score._attributes.vs" class="score">{{score._attributes.hs}}</div>
            <div v-else class="score">0</div>
          </div>
          <div class="score-team">
            <img :src="'/icons/nfl/' + score._attributes.vnn + '.png'" class="image" />
            <div v-if="score._attributes.vs" class="score">{{score._attributes.vs}}</div>
            <div v-else class="score">0</div>
          </div>
        </div>
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
            scores: null,
            week: 4,
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
                    this.data = convert.xml2json(res.data, {
                        compact: true,
                        spaces: 4
                    });
                    this.scores = JSON.parse(this.data).ss.gms.g;
                    console.log(this.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        nextScores() {
            this.week++;
            if (this.week > 4 && this.type === "PRE") {
                this.week = 1;
                this.type = "REG";
            }

            if (this.week > 17 && this.type === "REG") {
                this.week = 1;
                this.type = "POST";
            }

            if (this.week > 4 && this.type === "POST") {
                this.week = 1;
                this.type = "SB";
            }

            if (this.type === "SB") {
                this.year = this.year++;
                this.week = 1;
                this.type = "PRE";
            }

            this.fetchScores(this.year, this.week, this.type);
        },

        prevScores() {
            this.week--;
            if (this.week < 1 && this.type == "REG") {
                this.week = 4;
                this.type = "PRE";
            }

            if (this.week < 1 && this.type === "POST") {
                this.week = 17;
                this.type = "REG";
            }

            if (this.type === "SB") {
                this.week = 4;
                this.type = "POST";
            }

            if (this.week < 1 && this.type === "PRE") {
                this.year = this.year - 1;
                console.log(this.year);

                this.week = 1;
                this.type = "SB";
            }
            this.fetchScores(this.year, this.week, this.type);
        }
    },
    computed: {
        getTypeName() {
            switch (this.type) {
                case "PRE":
                    return "Preseason";
                case "REG":
                    return "Regular season";
                case "POST":
                    return "Playoffs";
                case "PRO":
                    return "Probowl";
                case "SB":
                    return "Superbowl";
            }
        }
    },
    created() {
        this.fetchScores(this.year, this.week, this.type);
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
    text-align: left;
    font-size: 0.8em;
}

.games {
    display: flex;
    align-items: center;
    background-image: linear-gradient(
        to bottom,
        rgba(31, 48, 59, 0.55),
        rgba(4, 17, 26, 0.7)
    );
}

.game {
    flex-grow: 1;
    padding: 10px;
    align-self: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.arrow {
    cursor: pointer;
    padding: 0px 10px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
}

.game-info {
    margin: 0px auto;
    text-align: center;
}

.score {
    text-align: right;
    padding: 15px;
}

.image {
    max-width: 38px;
    max-height: 38px;
}

.score-team {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.date {
    font-size: 0.7em;
    color: lightblue;
    padding-bottom: 10px;
}

.game-date {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 1000px) {
    .game {
        width: 25%;
        flex-grow: 0;
    }
}
</style>
