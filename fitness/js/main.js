/**
 * Created by sash-ua on 21.06.2016.
 */
window.onload = function(){
    document.getElementById('button').addEventListener('click', function(){
        document.getElementById('side-menu-parent').classList.toggle('display-side-menu');
    }, false);
    window.addEventListener('resize', function(){
        var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(windowW >= 680 && document.getElementsByClassName('display-side-menu')) document.getElementById('side-menu-parent').classList.remove('display-side-menu');
    }, false)
};