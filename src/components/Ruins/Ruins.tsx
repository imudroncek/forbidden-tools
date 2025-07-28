import { MdCastle } from 'react-icons/md'
import { useState } from 'preact/hooks'
import { ProgressOverlay } from '../ProgressOverlay/ProgressOverlay';

import './Ruins.css'

export function Ruins() {
    const [overlay, setOverlay] = useState(false);

    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function generateRuin() {
        setOverlay(true);
        const ruins = await fetchRuinsFile();
        ruins.forEach(section => {
            console.log(section.description);
            const roll = section.dice === "D66" ? rollD66() : rollD6();
            section.data.forEach(data => {
                if (data.roll.from <= roll && data.roll.to >= roll) {
                    console.log(data.info);
                    if (data.additionalRoll !== null) {
                        console.log("Sub roll required.");
                    }
                }
            });
        });
        console.log(ruins);
        await delay(5000);
        setOverlay(false);
    }

    async function fetchRuinsFile() {
        const url = "https://raw.githubusercontent.com/imudroncek/forbidden-tools/refs/heads/master/external/ruins.json";
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }

    function rollD66() {
        const A = Math.floor(Math.random() * 6) + 1;
        const B = Math.floor(Math.random() * 6) + 1;
        return (A * 10) + B;
    }

    function rollD6() {
        return Math.floor(Math.random() * 6) + 1;
    }

    return (
        <div class={"ruins bellefair-regular"}>
            <ProgressOverlay visible={overlay} />
            <div class={"text"}>
                <h1><MdCastle/></h1>
                <button onClick={() => generateRuin()}>Generate Ruin</button>
                <p>Generate Ruin</p>
            </div>
        </div>
    )
}