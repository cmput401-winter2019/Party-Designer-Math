export class TestButton { 
    constructor(scene, image, text, x, y)
	{
        //super(scene);
		this.scene = scene;
		//this.scene.add.existing(this);
		this.button = this.scene.add.image(0,0,image);
		this.setPosition(x,y);
    }

}
