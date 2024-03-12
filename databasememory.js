import { randomUUID } from "crypto";

export class dataBaseMemory {

    #videos = new Map();

    //SET => 
    //MAP =>

    list(search) {

        return Array.from(this.#videos.entries())
            .map((videoArr) => {

                const id = videoArr[0];
                const data = videoArr[1];

                return {
                    id,
                    ...data,
                }
            })
            .filter(video => {

                if (search) {

                    return video.title.includes(search);
                }
                return true
            })

    }

    create(video) {
        // UUID - ID UNICO
        const idVideo = randomUUID();

        this.#videos.set(idVideo, video);

    }

    update(id, video) {

        this.#videos.set(id, video);

    }

    delete(video) {

        this.#videos.delete(video);
    }
}