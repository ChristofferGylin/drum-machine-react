import { Player, Volume, Time, Transport } from "tone";

export default class DrumEngine {
    constructor(kit) {

        this.masterVolume = new Volume(-10).toDestination();
        this.channels = [];
        this.step = 0;
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