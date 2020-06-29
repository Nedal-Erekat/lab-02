'use strict'
let gArr = [];
let listOption = [];
function ProdautShow(title, imgUrl, decs, keyword, horns) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.decs = decs;
    this.keyword = keyword;
    this.horns = horns;
    gArr.push(this);
}
ProdautShow.prototype.render = function () {
    //    let templetCopy=$(".photo-template").clone();

    //    .appendTo("main");
    // let template = $('.photo-template').clone();
    // console.log(template);
    // templetCopy.removeClass('photo-template');
    // template.text(this.title);

    // console.log('hhhhhhhh');
    // $(`${template} h2`).test(this.title);
    // $('h2').text(this.title);
    // $('img').attr(`src`, this.imgUrl);
    // $('p').text(this.decs);
    // $('main').append(templetCopy);
    let div = $("<div></div>");
    let h2 = $("<h2></h2>").text(this.title);
    let imgEl = $("<img>").attr(`src`, this.imgUrl);
    let pEl = $("<p></p>").text(this.decs);
    $(".photo-template").append(div);
    div.append(h2, imgEl, pEl);
};
ProdautShow.prototype.renderList = function () {
    if (listOption.includes(this.keyword) === false) {
        let optionEl = $('<option></option>').text(this.keyword);
        $('select').append(optionEl);
        listOption.push(this.keyword);
    }
}

const ajaxSetting = { method: 'get', dataType: 'json' }
$.ajax('./data/page-1.json', ajaxSetting)
    .then((data) => {
        data.forEach(element => {
            let prod = new ProdautShow(element.title, element.image_url, element.description, element.keyword, element.horns);
            prod.render();
            prod.renderList();
        });
    });

$('select').on("change", (evnt) => {
    $(".photo-template").empty();
    let str = "";
    $("select option:selected").each(function () {
        str = $(this).text();
    });


    if(str==='Filter by Keyword'){
        location.reload();
        
    }
    gArr.forEach((item, i) => {
        let type = item.keyword;
        console.log('type : '+type+' ,str: '+str);
        console.log( 'result :'+ str ===type);

        
        if (str===type) {
            console.log('reached hinsidde the condition');
            
            let div = $("<div></div>");
            let h2 = $("<h2></h2>").text(item.title);
            let imgEl = $("<img>").attr(`src`, item.imgUrl);
            let pEl = $("<p></p>").text(item.decs);
            $(".photo-template").append(div);
            div.append(h2, imgEl, pEl);
        }
    })
})