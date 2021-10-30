/* eslint-disable no-alert */
import uploadApi from '@/request/uploadApi';

const toolListMixin = {
  methods: {
    // ------------------toolList: clickHandle------------------
    addFormat(type, special) {
      const { selectionStart, selectionEnd } = this.$refs.edit;
      let formatSplit = '';
      let formatText = '';

      if (special) { // orderList unorderList code
        if (type === 'orderList') {
          formatSplit = '1. ';
          formatText = '有序列表';
        } else if (type === 'unorderList') {
          formatSplit = '- ';
          formatText = '无序列表';
        } else if (type === 'code') {
          formatSplit = '```js\n';
          formatText = '\n```';
        }
        if (selectionStart === selectionEnd) {
          this.mdVal = `${this.mdVal.slice(0, selectionStart)}\n\n${formatSplit}${formatText}\n\n${this.mdVal.slice(selectionEnd)}`;
        } else {
          this.mdVal = `${this.mdVal.slice(0, selectionStart)}\n\n${formatSplit}${this.mdVal.slice(selectionStart, selectionEnd)}${formatText}\n\n${this.mdVal.slice(selectionEnd)}`;
        }
      } else { // bold italic deleteLine
        if (type === 'bold') {
          formatSplit = '**';
          formatText = '加粗';
        } else if (type === 'italic') {
          formatSplit = '*';
          formatText = '斜体';
        } else if (type === 'deleteLine') {
          formatSplit = '~~';
          formatText = '删除线';
        }
        if (selectionStart === selectionEnd) {
          this.mdVal = `${this.mdVal.slice(0, selectionStart)}${formatSplit}${formatText}${formatSplit}${this.mdVal.slice(selectionEnd)}`;
        } else {
          this.mdVal = `${this.mdVal.slice(0, selectionStart)}${formatSplit}${this.mdVal.slice(selectionStart, selectionEnd)}${formatSplit}${this.mdVal.slice(selectionEnd)}`;
        }
      }

      this.parseHandle();
    },
    addLink() {
      const { selectionEnd } = this.$refs.edit;
      const linkStr = '[链接描述文字](url)';
      this.mdVal = `${this.mdVal.slice(0, selectionEnd)} ${linkStr} ${this.mdVal.slice(selectionEnd)}`;
      this.parseHandle();
    },
    addExcel() {
      const { selectionEnd } = this.$refs.edit;
      const excelStr = '\n|  |  |\n|---|---|\n|  |  |\n';
      this.mdVal = `${this.mdVal.slice(0, selectionEnd)} ${excelStr} ${this.mdVal.slice(selectionEnd)}`;
      this.parseHandle();
    },
    /** 插入图片 */
    addPicture() {
      const { inpPic } = this.$refs;
      inpPic.click();
      inpPic.onchange = async () => {
        // 上传图片并获取其url地址
        const formData = new FormData();
        const fileList = inpPic.files;
        for (let i = 0; i < fileList.length; i += 1) {
          formData.append('picFile', fileList[i], fileList[i].name);
        }
        let urlArr;
        try {
          urlArr = await uploadApi.uploadImg(formData);
        } catch (err) {
          alert(err); // 提示上传失败的错误信息
          inpPic.value = '';
          return;
        }

        // 根据获取到的urlArr，生成对应的md格式的文本，插入到编辑区的光标所在位置并实时渲染
        const { selectionEnd } = this.$refs.edit;
        let resImgMd = '';
        for (let i = 0; i < urlArr.length; i += 1) {
          resImgMd += `\n![图片描述](${urlArr[i]})\n`;
        }
        this.mdVal = `${this.mdVal.slice(0, selectionEnd)}${resImgMd}${this.mdVal.slice(selectionEnd)}`;
        this.parseHandle();

        // 当第二次选择同一个文件，由于inpPic.value没有发生变化，无法触发change/onchange事件。需要手动清空inpPic.value
        inpPic.value = '';
      };
    },
    /** 导入md */
    importMd() {
      const { inpImportMd } = this.$refs;
      inpImportMd.click();
      inpImportMd.onchange = () => {
        const mdFile = inpImportMd.files[0];
        const isMd = /[\w\W]+.md$/g.test(mdFile.name);
        if (!isMd) {
          alert('必须导入markdown文件（后缀名为 .md）');
          inpImportMd.value = '';
          return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(mdFile);
        fileReader.onload = () => {
          this.mdVal = fileReader.result;
          this.parseHandle();
          inpImportMd.value = '';
        };
      };
    },
    /** 导出md */
    exportMd() {
      if (this.mdVal.trim() === '') {
        alert('导出markdown文件的内容不能为空');
        return;
      }
      const fileName = `${Math.random().toString(36).slice(-6)}_${Date.now()}.md`;
      const eleA = document.createElement('a');
      eleA.download = fileName;
      const fileBlob = new Blob([this.mdVal]);
      eleA.href = URL.createObjectURL(fileBlob);
      eleA.click();
    },
  },
};

export default toolListMixin;
