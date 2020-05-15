import io from 'socket.io-client';
import Card from '../helpers/card';
import Zone from '../helpers/zone';
import Dealer from '../helpers/dealer';


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
        this.load.image('backcard','src/assets/backcard.png');
        this.load.image('1-trèfle','src/assets/1-trèfle.gif');
        this.load.image('2-trèfle','src/assets/2-trèfle.gif');
        this.load.image('3-trèfle','src/assets/3-trèfle.gif');
        this.load.image('4-trèfle','src/assets/4-trèfle.gif');
        this.load.image('5-trèfle','src/assets/5-trèfle.gif');
        this.load.image('6-trèfle','src/assets/6-trèfle.gif');
        this.load.image('7-trèfle','src/assets/7-trèfle.gif');
        this.load.image('8-trèfle','src/assets/8-trèfle.gif');
        this.load.image('9-trèfle','src/assets/9-trèfle.gif');
        this.load.image('10-trèfle','src/assets/10-trèfle.gif');
        this.load.image('11-trèfle','src/assets/11-trèfle.gif');
        this.load.image('12-trèfle','src/assets/12-trèfle.gif');
        this.load.image('13-trèfle','src/assets/13-trèfle.gif');
        this.load.image('1-carreaux','src/assets/1-carreaux.gif');
        this.load.image('2-carreaux','src/assets/2-carreaux.gif');
        this.load.image('3-carreaux','src/assets/3-carreaux.gif');
        this.load.image('4-carreaux','src/assets/4-carreaux.gif');
        this.load.image('5-carreaux','src/assets/5-carreaux.gif');
        this.load.image('6-carreaux','src/assets/6-carreaux.gif');
        this.load.image('7-carreaux','src/assets/7-carreaux.gif');
        this.load.image('8-carreaux','src/assets/8-carreaux.gif');
        this.load.image('9-carreaux','src/assets/9-carreaux.gif');
        this.load.image('10-carreaux','src/assets/10-carreaux.gif');
        this.load.image('11-carreaux','src/assets/11-carreaux.gif');
        this.load.image('12-carreaux','src/assets/12-carreaux.gif');
        this.load.image('13-carreaux','src/assets/13-carreaux.gif');
        this.load.image('1-coeur','src/assets/1-coeur.gif');
        this.load.image('2-coeur','src/assets/2-coeur.gif');
        this.load.image('3-coeur','src/assets/3-coeur.gif');
        this.load.image('4-coeur','src/assets/4-coeur.gif');
        this.load.image('5-coeur','src/assets/5-coeur.gif');
        this.load.image('6-coeur','src/assets/6-coeur.gif');
        this.load.image('7-coeur','src/assets/7-coeur.gif');
        this.load.image('8-coeur','src/assets/8-coeur.gif');
        this.load.image('9-coeur','src/assets/9-coeur.gif');
        this.load.image('10-coeur','src/assets/10-coeur.gif');
        this.load.image('11-coeur','src/assets/11-coeur.gif');
        this.load.image('12-coeur','src/assets/12-coeur.gif');
        this.load.image('13-coeur','src/assets/13-coeur.gif');
        this.load.image('1-pique','src/assets/1-pique.gif');
        this.load.image('2-pique','src/assets/2-pique.gif');
        this.load.image('3-pique','src/assets/3-pique.gif');
        this.load.image('4-pique','src/assets/4-pique.gif');
        this.load.image('5-pique','src/assets/5-pique.gif');
        this.load.image('6-pique','src/assets/6-pique.gif');
        this.load.image('7-pique','src/assets/7-pique.gif');
        this.load.image('8-pique','src/assets/8-pique.gif');
        this.load.image('9-pique','src/assets/9-pique.gif');
        this.load.image('10-pique','src/assets/10-pique.gif');
        this.load.image('11-pique','src/assets/11-pique.gif');
        this.load.image('12-pique','src/assets/12-pique.gif');
        this.load.image('13-pique','src/assets/13-pique.gif');        

    }

    create() {

        //players
        this.isPlayerA = false;
        this.opponentCards = [];

        //server connexion
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards(4);
            self.dealText.disableInteractive();
        })
        
        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
            }
        })

        //Deal cards
        this.dealer = new Dealer(this);

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        this.EndTurnText = this.add.text(75, 700, ['END TURN']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        let self = this;

        
		this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        // Zone
        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x) + (dropZone.data.values.cards);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })
    }
    
    update() {
    
    }
}