export default class Scenario {
    constructor(player) {
        this.player = player;
        this.start_time = Date.now();
        this.scenario = [/*
            { text: "Hi, I'm prince of Yaginia.", start: 0, duration: 1800 },
            { text: "I'm being held captive by King", start: 1800, duration: 3000 },
            { text: "because it's dangerous out there.", start: 4800, duration: 3000 },
            { text: "I have to learn how to survive.", start: 7800, duration: 3000 },*/
        ];
    }

    addScenario(text, duration) {
        if (this.scenario.length == 0)
            this.scenario.push({ text: text, start: Date.now() - this.start_time, duration: duration });
    }

    tick(ctx) {
        let now = Date.now();
        this.scenario.forEach(part => {
            if (now > this.start_time + part.start && now < this.start_time + part.start + part.duration)
                this.player.talk(ctx, part.text);
        });
        let start_time = this.start_time;

        this.scenario = this.scenario.filter(function (part) {
            return now < start_time + part.start + part.duration;
        });
    }
}
