const rows: number = 5;
const tiles: number = rows * rows;
const median_tile: number = Math.ceil(tiles / 2);
const all_players: string[] = ['amity','chloe','alex','westy','happyeye','popa','mitty','remedy','doorknob'];
const tile: string[] = [
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
    'chloe bark',
    'chloe squeak',
    'chloe yawn',
    'chloe being emo',
    'chloe accidently presses bind',
    'chloe sleep deprived',
    'chloe goes to wrong second/rollout side',
    'chloe exasperated sigh',
    'chloe kritz kill',
    'chloe "thaaat\'s crazy"',
    'chloe "bet"',
    'chloe *pop-pop-pop*',
    'chloe *desk boom*',
    'chloe refers to herself in 3rd person',
    'chloe messes up rollout',
    'chloe gets hit by ubersaw',
    'chloe gets startled',
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
    'alex "i\'m balling"',
    'alex "i\'m cooling brah"',
    'alex "duuuude"',
    'alex "i\'m not using to this guy"',
    'alex "put me on demo"',
    'alex "ain\'t no way"',
    'alex talks about jazz',
    'alex repeats a joke nonstop',
    'alex complains about playing medic',
    'alex ":3"',
    'alex goes afk',
    'mitty switches to original',
    'mitty unstable internet',
    'mitty "we\'re (so) back"',
    'mitty leaves vc instantly',
    'mitty goes quiet',
    'mitty "zawg"/"shnawg"',
    'mitty music reference alias',
    'doorknob being too hard on himself',
    'doorknob "it\'s fine"',
    'doorknob building on 100% uber',
    'doorknob "all i\'m saying is"',
    'doorknob "i\'m spitting facts"',
    'remedy changes name',
    'remedy changes pfp',
    'remedy gets loud',
    'remedy mentions dragon ball',
    'remedy sacs while mitty is sacing',
    'remedy "i\'m going nuts"',
    'remedy "fuck it" *bombs*',
    'remedy "on your soldier"',
]


//Create a randomized bingo board.
function generate_bingo(players: string[]): void {
    let tile_pool: string[] = create_tile_pool(tile, players);
    let tile_text: string = '';
    for (let i = 1; i <= tiles; i++) {
        const chosen_index: number = Math.floor(Math.random() * tile_pool.length);
        if (i === median_tile) {
            tile_text = "*free space*"
        } else {
            tile_text = tile_pool[chosen_index];
            tile_pool.splice(chosen_index,1);
        }
        const element = document.getElementById('tile_'+i)!;
        element.innerHTML = tile_text;
    } 
}


//Create a pool a valid tiles from the master list, excluding those with unchecked players.
function create_tile_pool(tile_list: string[], players: string[]): string[] {
    let tile_pool: string[] = [...tile_list];
    const excluded_players = [...all_players].filter(x => !players.includes(x));

    for (const player of excluded_players) {
        tile_pool = tile_pool.filter(t => !t.includes(player))
    }
    return tile_pool;
}


//Flip the state of a tile.
const tile_state: boolean[] = new Array(tiles).fill(false);
function mark_tile(index: number): void {
    tile_state[index-1] = tile_state[index-1] ? false : true;
    const element: HTMLElement = document.getElementById('tile_'+index)!;
    element.style.backgroundColor = tile_state[index-1] ? '#b6eb76' : '#fbfff6'
    update_num_bingos();
}

function get_enabled_players(): string[] {
    let players: string[] = [];
    const checkboxes: any = document.querySelectorAll('input[name="player"]:checked');
    checkboxes.forEach((checkbox: any) => {
        players.push(checkbox.value);
    });
    return players;
}

function get_num_bingos(): number {
    let num_bingos = 0;
    //calc vertical bingos
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < rows; y++) {
            const index = (y * rows) + x;
            if (!tile_state[index]) break;
            if (y === rows-1) num_bingos++;
        }
    }
    //calc horizontal bingos
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++) {
            const index = (y * rows) + x;
            if (!tile_state[index]) break;
            if (x === rows-1) num_bingos++;
        }
    }
    //calc diagonal bingo top-left>bottom-right
    for (let d = 0; d < rows; d++) {
        const index = (d * rows) + d;
        if (!tile_state[index]) break;
        if (d === rows-1) num_bingos++;
    }
    //calc diagonal bingo bottom-left>top-right
    for (let d = (rows-1) * rows; d > 0; d-=(rows-1)) {
        const index = d;
        if (!tile_state[index]) break;
        if (d === rows-1) num_bingos++;
    }
    return num_bingos;
}

function update_num_bingos() {
    const num_bingos: number = get_num_bingos();
    const element: HTMLElement = document.getElementById('num_bingos_text')!;
    let num_bingos_text: string = '';
    num_bingos_text = num_bingos === 0 ? '' : num_bingos === 1 ? '1 bingo!' : num_bingos + ' bingos!';
    element.innerHTML = num_bingos_text;
}

//Refresh the board after applying checkbox states.
const refresh = document.querySelector('#refresh')!;
refresh.addEventListener('click', (event) => {
    generate_bingo(get_enabled_players()); //generate new bingo

    //toggle all marked tiles
    for (let i = 0; i < 25; i++) {
        if (i !== median_tile-1 && tile_state[i]) {
            mark_tile(i+1);
        }
    }
});

//init
generate_bingo(get_enabled_players());
mark_tile(median_tile);