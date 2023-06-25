"use strict";
const all_players = ['amity', 'chloe', 'alex', 'westy', 'happyeye', 'popa', 'mitty', 'remedy', 'doorknob'];
const tile = [
    //'"that\'s going on the tierlist."',
    //'"<3 heart for you"',
    //'"what happone?"',
    //'the ants are mentioned',
    '"anyone still riding the high from winning last night?"',
    '"why are there traps there"',
    '"?" (singular)',
    '"???" (3 or more)',
    'zero damage sac',
    'lose by one',
    'scrim baited',
    'medic drops to market gardener',
    'medic drops to stickytrap',
    'wrong cfg',
    '0 kills + wipe on mid',
    'engie in pregame',
    'start 20 min late',
    'phonecall on vc',
    'someone eating dinner',
    'fail full ad push',
    '"hewwwo ^_^"',
    '"everypony"',
    'chloe barks',
    'chloe squeaks',
    'chloe yawn',
    'chloe being emo',
    'chloe accidently presses bind',
    'chloe sleep deprived',
    'chloe goes to wrong second/rollout side',
    'chloe exasperated sigh',
    'chloe kritz kill',
    'chloe mentions toes',
    'chloe "thaaat\'s crazy"',
    'chloe "bet"',
    'happyeye afk on midfight',
    'happyeye "i\'m clipping that."',
    'happyeye meditates',
    'happyeye yelled at for not crouching in spawn',
    'happyeye offclass out of last',
    'happyeye apologizes after scrim',
    'happyeye bms then apologizes for it',
    'happyeye shoots with melee out',
    'happyeye leaves vc midgame',
    'happyeye uses in-game chat',
    'happyeye mentions his accuracy',
    'happyeye insists he is not feeding',
    'happyeye mentions hotwheels',
    'happyeye changes name',
    'happyeye "nothing i could do there"',
    'happyeye compares stats to westy',
    'happyeye joins vc while driving',
    'happyeye facecam',
    'happyeye girl voice',
    'happyeye changes cosmetics',
    'happyeye readies instantly',
    'happyeye having an "off day"',
    'happyeye "siri set a 15 minute timer"',
    'happyeye repeats what alex just said',
    'happyeye dms alex midgame',
    'happyeye reads one of his binds',
    'happyeye "thank you for the scrims"',
    'amity comms troll',
    'amity silently tilts',
    'amity hits edgebug',
    'amity "we should have easily won that."',
    'amity mentions jums',
    'westy last in vc',
    'westy "these players are ass"',
    'westy complains about offclasses',
    'westy "come on now"',
    'westy "desk boom"',
    'westy kill with engie crits',
    'alex is "balling"',
    'alex insists he\'s cooling',
    'alex "duuuude"',
    'alex "put me on demo"',
    'alex "ain\'t no way"',
    'alex talks about jazz',
    'alex repeats a joke nonstop',
    'mitty switches to original',
    'mitty unstable internet',
    'mitty "we\'re (so) back"',
    'mitty leaves vc instantly',
    'mitty goes quiet',
    'doorknob being too hard on himself',
    'doorknob "it\'s fine"',
    'doorknob building on 100% uber',
    'doorknob "all i\'m saying is"',
    'remedy changes name',
    'remedy changes pfp',
    'remedy gets loud',
    'remedy mentions dragon ball',
    'remedy sacs while mitty is sacing',
];
/**
 * Create a randomized bingo board.
 */
function generate_bingo(players) {
    let tile_pool = create_tile_pool(tile, players);
    let tile_text = '';
    for (let i = 1; i <= 25; i++) {
        const chosen_index = Math.floor(Math.random() * tile_pool.length);
        if (i === 13) {
            tile_text = "*free space*";
        }
        else {
            tile_text = tile_pool[chosen_index];
            tile_pool.splice(chosen_index, 1);
        }
        const element = document.getElementById('tile_' + i);
        element.innerHTML = tile_text;
    }
}
/**
 * Create a pool a valid tiles from the master list, excluding those with unchecked players.
 */
function create_tile_pool(tile_list, players) {
    let tile_pool = [...tile_list];
    const excluded_players = [...all_players].filter(x => !players.includes(x));
    for (const player of excluded_players) {
        tile_pool = tile_pool.filter(t => !t.includes(player));
    }
    return tile_pool;
}
/**
 * Flip the state of a tile.
 */
const tile_state = new Array(25).fill(false);
function mark_tile(index) {
    tile_state[index] = tile_state[index] ? false : true;
    const element = document.getElementById('tile_' + index);
    element.style.backgroundColor = tile_state[index] ? '#b6eb76' : '#fbfff6';
    //document.getElementById('tile_'+index).style.backgroundColor = '#b6eb76'
}
function get_enabled_players() {
    let players = [];
    const checkboxes = document.querySelectorAll('input[name="player"]:checked');
    checkboxes.forEach((checkbox) => {
        players.push(checkbox.value);
    });
    return players;
}
function get_num_bingos() {
    let num_bingos = 0;
    const t = tile_state; //shorthand for readability
    //there are 12 possible bingos:
    if (t[0] && t[1] && t[2] && t[3] && t[4])
        num_bingos++;
    return num_bingos;
}
/**
 * Refresh the board after applying checkbox states.
 */
const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', (event) => {
    generate_bingo(get_enabled_players()); //generate new bingo
    //toggle all marked tiles
    for (let i = 0; i < 25; i++) {
        if (i !== 13 && tile_state[i]) {
            mark_tile(i);
        }
    }
});
//on first run
generate_bingo(get_enabled_players());
mark_tile(13); //center tile starts marked
