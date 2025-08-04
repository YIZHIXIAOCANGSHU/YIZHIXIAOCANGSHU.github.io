(function() {
  'use strict';
  
  // PDF查看器类
  class PDFViewer {
    constructor(options = {}) {
      this.options = {
        containerId: 'pdf-container',
        pdfUrl: null,
        scale: 1.5,
        workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js',
        ...options
      };
      
      this.container = document.getElementById(this.options.containerId);
      this.pdfDoc = null;
      
      // 初始化PDF.js
      if (typeof pdfjsLib !== 'undefined') {
        this.init();
      } else {
        console.warn('PDF.js library not found. PDF viewing functionality will be disabled.');
      }
    }
    
    // 初始化PDF查看器
    init() {
      if (!this.container || !this.options.pdfUrl) {
        console.warn('PDF container or URL not specified');
        return;
      }
      
      // 设置PDF.js worker路径
      pdfjsLib.GlobalWorkerOptions.workerSrc = this.options.workerSrc;
      
      // 加载PDF文档
      this.loadPDF();
    }
    
    // 加载PDF文档
    loadPDF() {
      // 显示加载指示器
      this.showLoadingIndicator();
      
      pdfjsLib.getDocument(this.options.pdfUrl).promise.then((pdfDoc) => {
        this.pdfDoc = pdfDoc;
        this.renderAllPages();
      }).catch((error) => {
        console.error('Error loading PDF:', error);
        this.showError('Failed to load PDF document');
      });
    }
    
    // 渲染所有页面
    renderAllPages() {
      // 清空容器
      this.container.innerHTML = '';
      
      // 渲染每一页
      for (let pageNum = 1; pageNum <= this.pdfDoc.numPages; pageNum++) {
        this.renderPage(pageNum);
      }
    }
    
    // 渲染单个页面
    renderPage(pageNum) {
      this.pdfDoc.getPage(pageNum).then((page) => {
        // 创建canvas元素
        const canvas = document.createElement('canvas');
        canvas.style.marginBottom = '10px';
        canvas.style.width = '100%';
        canvas.style.border = '1px solid #ccc';
        canvas.id = `pdf-page-${pageNum}`;
        this.container.appendChild(canvas);
        
        // 设置视口和缩放
        const viewport = page.getViewport({ scale: this.options.scale });
        
        // 设置canvas尺寸
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // 渲染页面
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        page.render(renderContext);
      }).catch((error) => {
        console.error(`Error rendering page ${pageNum}:`, error);
      });
    }
    
    // 显示加载指示器
    showLoadingIndicator() {
      this.container.innerHTML = '<p>Loading PDF...</p>';
    }
    
    // 显示错误信息
    showError(message) {
      this.container.innerHTML = `<p>Error: ${message}</p>`;
    }
  }
  
  // 页面加载完成后初始化PDF查看器
  document.addEventListener('DOMContentLoaded', function() {
    // 查找所有PDF容器元素
    const pdfContainers = document.querySelectorAll('[data-pdf-url]');
    
    pdfContainers.forEach((container) => {
      const pdfUrl = container.getAttribute('data-pdf-url');
      const containerId = container.id || 'pdf-container-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      
      // 设置容器ID
      if (!container.id) {
        container.id = containerId;
      }
      
      // 创建PDF查看器实例
      new PDFViewer({
        containerId: containerId,
        pdfUrl: pdfUrl
      });
    });
  });
  
  // 将PDFViewer暴露到全局作用域（如果需要）
  if (typeof window !== 'undefined') {
    window.PDFViewer = PDFViewer;
  }
})();