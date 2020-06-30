'use strict'
let gArr = [];
let listOption = [];
let templateId = '#templateToPhoto';
let btn1Status = true;
let btn2Status = false;
function ProdautShow(title, imgUrl, decs, keyword, horns) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.decs = decs;
    this.keyword = keyword;
    this.horns = horns;
    gArr.push(this);
}

ProdautShow.prototype.render = function () {

    // solution1
    /* let templetCopy = $(".photo-template").clone();
     templetCopy.removeClass("photo-template")
     templetCopy.find('h2').text(this.title);
     templetCopy.find('img').attr('src', this.imgUrl);
     templetCopy.find('p').text(this.decs);
     $('.cont').append(templetCopy);*/




    // solution 2
    /*let div = $("<div></div>");
    let h2 = $("<h2></h2>").text(this.title);
    let imgEl = $("<img>").attr(`src`, this.imgUrl);
    let pEl = $("<p></p>").text(this.decs);
    $(".photo-template").append(div);
    div.append(h2, imgEl, pEl);*/

    //solution 3 : mustache

    let musTemplate = $('#templateToPhoto').html();
    console.log(this);

    let newObj = Mustache.render(musTemplate, this);
    console.log(newObj);
    $('.photo-template').append(newObj);
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
        console.log("data: " + data);

        data.forEach(element => {
            let prod = new ProdautShow(element.title, element.image_url, element.description, element.keyword, element.horns);
            prod.render();
            prod.renderList();
        });
    });
$('#first').on("click", () => {

    location.reload();
});
$('#second').on("click", () => {
    btn1Status = false;
    btn2Status = true;
    $('.photo-template').empty();
    $.ajax('./data/page-2.json', ajaxSetting)
        .then((data) => {
            console.log("data: " + data);
            gArr = [];
            listOption = [];
            $('option:not(:first-child)').css('display','none');
            //    while ($('select:nth-child(2)')) {

            //        $('select:nth-child(2)').remove();
            //    }
            // $('select').empty();
            data.forEach(element => {
                let prod = new ProdautShow(element.title, element.image_url, element.description, element.keyword, element.horns);
                prod.render();
                prod.renderList();
            });
        });
})


$('select').on("change", (evnt) => {
    $(".photo-template").empty();
    let str = "";
    $("select option:selected").each(function () {
        str = $(this).text();
    });


    if (str === 'Filter by Keyword') {
        if (btn1Status) {//true//btn2 => false
            location.reload();
        } else if (btn2Status) {//true//btn1 => false
            $('#second').trigger('click');
        }
        // location.reload();

    }
    gArr.forEach((item, i) => {
        let type = item.keyword;
        console.log('type : ' + type + ' ,str: ' + str);
        console.log('result :' + str === type);


        if (str === type) {
            // console.log('reached hinsidde the condition');

            // let div = $("<div></div>");
            // let h2 = $("<h2></h2>").text(item.title);
            // let imgEl = $("<img>").attr(`src`, item.imgUrl);
            // let pEl = $("<p></p>").text(item.decs);
            // $(".photo-template").append(div);
            // div.append(h2, imgEl, pEl);

            let musTemplate = $('#templateToPhoto').html();
            let newObj = Mustache.render(musTemplate, item);
            $('.photo-template').append(newObj);
        }
    })
})


// add event to s