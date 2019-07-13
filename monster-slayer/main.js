Vue.component('start-game', { 
    name:'start-game',
    template:'<section>'
                +'<div class="small-12 colums">'
                  + '<button id="start-game">'
                  + 'START A NEW GAME'
                  + '</button>'
                  + '</div>'
            +'</section>',
 });

 Vue.component('action-buttons',{
     name:'action-buttons',
    props:['testprop'],
     template:'<section class="row controls">'
                +'<div class="small-12 columns">'
                    +'<button id="attack">ATTACK</button>'
                    +'<button id="special-attack">SPECIAL ATTACK</button>'
                    +'<button id="heal">HEAL</button>'
                    +'<button id="give-up">GIVE UP</button>'
                    +'<button @click="clickme">Test</button>'
                    +'<strong>{{ testprop }}</strong>'
                +'</div>'
              +'</section>',
    methods:{
        clickme: function(){
            console.log(this.testprop)
            this.testprop = 'changed for demo';
            this.$emit('tame',this.testprop);
        }
    }
 })

new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        // game is running or not
        gameIsRunning: false,
        everyTurn:[],
        testa:'testaki'
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.everyTurn = [];
        },
        attack: function(){
            // random number between 3 and 10
            let damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.everyTurn.unshift({
                isPlayer: true,
                text: 'Player hits Monster for' + ' ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.playerHealth -= this.calculateDamage(5,10);
            this.checkWin();
        },
        specialAttack: function(){
            let damage = this.calculateDamage(8,19);
            this.monsterHealth -= damage;
            this.everyTurn.unshift({
                isPlayer: true,
                text: 'Player is crushing the Monster damage dealt:' + ' ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.mosterAttacks();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth +=10;
            }else{
                this.playerHealth = 100;
            }
            this.everyTurn.unshift({
                isPlayer: true,
                text: 'Heals for 10:'
            });
            this.mosterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        // functions executed on event methods
        mosterAttacks: function(){
            let damage = this.calculateDamage(5,10);
            this.playerHealth -= damage;
            this.checkWin();
            this.everyTurn.unshift({
                isPlayer: false,
                text: 'Monster hits player for' + ' ' + damage
            });
        },
        calculateDamage: function(min,max){
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0) {
                if(confirm('You Won!!')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
                
            }else if (this.playerHealth <= 0){
                if(confirm('You lost!!Wanna play a new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return false;
            }
        }
    }
});

