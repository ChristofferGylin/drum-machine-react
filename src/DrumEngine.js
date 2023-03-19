import * as Tone from 'tone';
import { Player, Volume, Time, Transport } from "tone";

export default class DrumEngine {
    constructor(kit, setSteps) {

        this.masterVolume = new Volume(-10).toDestination();
        this.channels = [];
        this.step = 0;
        this.patternMode = false,
            this.playStep = (time) => {

                if (!this.patternMode) {

                    const stepPads = [
                        false, false, false, false,
                        false, false, false, false,
                        false, false, false, false,
                        false, false, false, false,
                    ]

                    stepPads[this.step] = true;
                    setSteps(stepPads);

                }

                for (let i = 0; i < this.channels.length; i++) {

                    if (this.channels[i].pattern[this.step]) {

                        this.channels[i].player.start(time);

                    }

                }

                this.step++;

                if (this.step === 16) {

                    this.step = 0;

                }

            }
        this.sequencer = Tone.Transport.scheduleRepeat(this.playStep, '16n');
        this.loadKit = (kit) => {

            if (this.channels.length > kit.length) {

                this.channels.length = kit.length;

            } else if (this.channels.length < kit.length) {

                for (let i = this.channels.length; i < kit.length; i++) {

                    const drumChannel = {

                        title: '',
                        player: new Player(),
                        volume: new Volume(),
                        pattern: [
                            false, false, false, false,
                            false, false, false, false,
                            false, false, false, false,
                            false, false, false, false,
                        ]

                    }

                    drumChannel.player.connect(drumChannel.volume);
                    drumChannel.volume.connect(this.masterVolume);

                    this.channels.push(drumChannel);

                }

            }

            for (let i = 0; i < kit.length; i++) {

                this.channels[i].player.load(kit[i].url);
                this.channels[i].title = kit[i].title;

            }

        }
        this.loadKit(kit);

    }

}