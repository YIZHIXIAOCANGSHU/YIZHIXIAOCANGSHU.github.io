(function() {
  'use strict';
  
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 获取导出按钮
    const exportButton = document.getElementById('export-pdf');
    
    // 如果页面上没有导出按钮，则退出
    if (!exportButton) {
      return;
    }
    
    // 添加点击事件监听器
    exportButton.addEventListener('click', function() {
      exportToPDF();
    });
    
    // 导出PDF功能
    function exportToPDF() {
      // 显示加载提示
      const btn = exportButton;
      const originalText = btn.textContent;
      btn.textContent = '正在生成PDF...';
      btn.disabled = true;
      
      // 获取要转换为PDF的内容
      const element = document.querySelector('.page__content') || document.querySelector('.page');
      
      if (!element) {
        alert('未能找到页面内容');
        btn.textContent = originalText;
        btn.disabled = false;
        return;
      }
      
      // 配置PDF选项
      const options = {
        margin: 10,
        filename: '简历.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // 生成PDF
      html2pdf().set(options).from(element).save().then(() => {
        // 恢复按钮状态
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 1000);
      }).catch((error) => {
        console.error('PDF生成失败:', error);
        alert('PDF生成失败，请重试');
        btn.textContent = originalText;
        btn.disabled = false;
      });
    }
  });
})();