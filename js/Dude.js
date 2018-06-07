class Dude
{
    //to create an individual soldier
    constructor(dudeMesh, speed, id, scene, scaling)
    {
        this.dudeMesh = dudeMesh;
        this.scene = scene;
        this.id = id;
        dudeMesh.Dude = this;
        if(speed)
            this.speed = speed;
        else
            this.speed = 1;

        if (scaling)
        {
            this.scaling = scaling;
            this.dudeMesh.scaling = new BABYLON.Vector3(this.scaling, this.scaling, this.scaling);
        }
        else
            this.scaling = 1;

        if (Dude.boundingBoxParameters == undefined)
        {
            Dude.boundingBoxParameters = this.CalculateBoundingBoxParameters();
        }
       this.bounder = this.createBoundingBox();
       this.bounder.dudeMesh = this.dudeMesh;

    }

    //to make the soldier move as well as setting the direction of its movement
    move()
    {
        if (!this.bounder) return;
        this.dudeMesh.position = new BABYLON.Vector3(this.bounder.position.x,
            this.bounder.position.y - this.scaling * Dude.boundingBoxParameters.lengthY / 2.0, this.bounder.position.z);
        var tank = scene.getMeshByName("Tank");
        var direction = tank.position.subtract(this.dudeMesh.position);
        var distance = direction.length();
        var dir = direction.normalize();
        var alpha = Math.atan2(-1 * dir.x, -1 * dir.z);
        this.dudeMesh.rotation.y = alpha;
        if(distance > 30)
            this.bounder.moveWithCollisions(dir.multiplyByFloats(this.speed,this.speed,this.speed));
    }

    //creating a box to avoid colision with the other meshes
    createBoundingBox()
    {
        var lengthX = Dude.boundingBoxParameters.lengthX;
        var lengthY = Dude.boundingBoxParameters.lengthY;
        var lengthZ = Dude.boundingBoxParameters.lengthZ;

        var bounder = new BABYLON.Mesh.CreateBox("bounder" + (this.id).toString(), 1, this.scene);

        bounder.scaling.x = lengthX * this.scaling;
        bounder.scaling.y = lengthY * this.scaling;
        bounder.scaling.z = lengthZ * this.scaling * 2;

        bounder.isVisible = false;

        var bounderMaterial = new BABYLON.StandardMaterial("bounderMaterial", this.scene);
        bounderMaterial.alpha = .5;
        bounder.material = bounderMaterial;
        bounder.checkCollisions = true;

        bounder.position = new BABYLON.Vector3(this.dudeMesh.position.x, this.dudeMesh.position.y + this.scaling * lengthY/2, this.dudeMesh.position.z);
        return bounder;
    }

    //to calculate the size of the box
    CalculateBoundingBoxParameters() {
        var minX = 999999; var minY = 99999; var minZ = 999999;
        var maxX = -99999; var maxY = -999999; var maxZ = -99999;

        var children = this.dudeMesh.getChildren();

        for (var i = 0 ; i < children.length ; i++) {
            var positions = new BABYLON.VertexData.ExtractFromGeometry(children[i]).positions;
            if (!positions) continue;

            var index = 0;
            for (var j = index ; j < positions.length ; j += 3) {
                if (positions[j] < minX)
                    minX = positions[j];
                if (positions[j] > maxX)
                    maxX = positions[j];
            }
            index = 1;
            for (var j = index ; j < positions.length ; j += 3) {
                if (positions[j] < minY)
                    minY = positions[j];
                if (positions[j] > maxY)
                    maxY = positions[j];
            }
            index = 2;
            for (var j = index ; j < positions.length ; j += 3) {
                if (positions[j] < minZ)
                    minZ = positions[j];
                if (positions[j] > maxZ)
                    maxZ = positions[j];
            }

            var _lengthX = maxX - minX;
            var _lengthY = maxY - minY;
            var _lengthZ = maxZ - minZ;

        }


        return { lengthX: _lengthX, lengthY: _lengthY, lengthZ: _lengthZ };
    }
}

//creating the first soldier
function createHeroDude(scene)
{
    BABYLON.SceneLoader.ImportMesh("him","Models/Dude/", "Dude.babylon", scene, onDudeImported);
    function onDudeImported(newMeshes, particleSystems, skeletons)
    {
        newMeshes[0].position = new BABYLON.Vector3(0,3,5);
        newMeshes[0].name = "heroDude";
        var heroDude = newMeshes[0];
        scene.beginAnimation(skeletons[0],0,120,true,1.0);

        var hero = new Dude(heroDude,2, -1,scene,.2);

        scene.dudes =[];
        scene.dudes[0] = heroDude;

        for (var q = 1; q <= 10; q++)
        {
            scene.dudes[q] = DoClone(heroDude, skeletons, q);
            scene.beginAnimation(scene.dudes[q].skeleton, 0, 120, true, 1.0);
            var temp = new Dude(scene.dudes[q], 2, q, scene, .2);
        }
    }
}

//to create multiple soldiers
function DoClone(original, skeletons, id) {
    var myClone;
    var xrand = Math.floor(Math.random() * 501) - 250;
    var zrand = Math.floor(Math.random() * 501) - 250;

    myClone = original.clone("clone_" + id);
    myClone.position = new BABYLON.Vector3(xrand, 0, zrand);
    if (!skeletons) {
        return myClone;
    }
    else {
        if (!original.getChildren()) {
            myClone.skeleton = skeletons[0].clone("clone_" + id + "_skeleton");
            return myClone;
        }
        else {
            if (skeletons.length == 1)// this means one skeleton controlling/animating all the children
            {
                var clonedSkeleton = skeletons[0].clone("clone_" + id + "_skeleton");
                myClone.skeleton = clonedSkeleton;
                var numChildren = myClone.getChildren().length;
                for (var i = 0 ; i < numChildren ; i++) {
                    myClone.getChildren()[i].skeleton = clonedSkeleton;
                }
                return myClone;
            }
            else if (skeletons.length == original.getChildren().length) { // Most probably each child has its own skeleton
                for (var i = 0 ; i < myClone.getChildren().length; i++) {
                    myClone.getChildren()[i].skeleton = skeletons[i].clone("clone_" + id + "_skeleton_" + i);
                }
                return myClone;
            }
        }
    }

    return myClone;
}

//to move the original soldier
function moveHeroDude()
{
    var heroDude = scene.getMeshByName("heroDude");
    if (heroDude)
        heroDude.Dude.move();
}

//to move the other soldiers
function moveOtherDudes()
{
    if (scene.dudes) {
        for (var q = 0 ; q < scene.dudes.length ; q++) {
            scene.dudes[q].Dude.move();
        }
    }
}