const { jsPDF } = window.jspdf;

// App State
const state = {
    selectedLabel: 'all', // 'all' or 0-9
    labels: Array.from({ length: 10 }, () => ({
        title: 'NUEVO DISKETE',
        content: 'Lista de archivos y notas adicionales.',
        date: new Date().toISOString().split('T')[0],
        color: '#00f2ff',
        image: null,
        cornerRadius: 0,
        lineWidth: 0.2
    }))
};

// DOM Elements
const elements = {
    selector: document.getElementById('label-selector'),
    title: document.getElementById('label-title'),
    content: document.getElementById('label-content'),
    date: document.getElementById('label-date'),
    color: document.getElementById('label-color'),
    image: document.getElementById('label-image'),
    radius: document.getElementById('corner-radius'),
    radiusVal: document.getElementById('radius-val'),
    width: document.getElementById('line-width'),
    widthVal: document.getElementById('width-val'),
    labelsGrid: document.getElementById('labels-grid'),
    generateBtn: document.getElementById('generate-btn')
};

// Initialize
function init() {
    // Event Listeners
    elements.selector.addEventListener('change', (e) => {
        state.selectedLabel = e.target.value === 'all' ? 'all' : parseInt(e.target.value);
        updateInputsFromState();
    });

    const updateLabelState = (key, value) => {
        if (state.selectedLabel === 'all') {
            state.labels.forEach(label => label[key] = value);
        } else {
            state.labels[state.selectedLabel][key] = value;
        }
        updatePreview();
    };

    elements.title.addEventListener('input', e => updateLabelState('title', e.target.value));
    elements.content.addEventListener('input', e => updateLabelState('content', e.target.value));
    elements.date.addEventListener('input', e => updateLabelState('date', e.target.value));
    elements.color.addEventListener('input', e => updateLabelState('color', e.target.value));
    
    elements.radius.addEventListener('input', e => {
        const val = parseFloat(e.target.value);
        elements.radiusVal.textContent = `${val}mm`;
        updateLabelState('cornerRadius', val);
    });

    elements.width.addEventListener('input', e => {
        const val = parseFloat(e.target.value);
        elements.widthVal.textContent = `${val}mm`;
        updateLabelState('lineWidth', val);
    });

    elements.image.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            updateLabelState('image', base64);
        }
    });

    elements.generateBtn.addEventListener('click', generatePDF);

    updateInputsFromState();
    updatePreview();
}

function updateInputsFromState() {
    const source = state.selectedLabel === 'all' ? state.labels[0] : state.labels[state.selectedLabel];
    
    elements.title.value = source.title;
    elements.content.value = source.content;
    elements.date.value = source.date;
    elements.color.value = source.color;
    elements.radius.value = source.cornerRadius;
    elements.radiusVal.textContent = `${source.cornerRadius}mm`;
    elements.width.value = source.lineWidth;
    elements.widthVal.textContent = `${source.lineWidth}mm`;
    elements.image.value = ''; // Reset file input
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function updatePreview() {
    elements.labelsGrid.innerHTML = '';
    
    state.labels.forEach((label, i) => {
        const labelEl = document.createElement('div');
        labelEl.className = 'floppy-label';
        labelEl.style.borderRadius = `${label.cornerRadius}mm`;
        labelEl.style.borderWidth = `${label.lineWidth}mm`;
        
        if (label.image) {
            labelEl.style.backgroundImage = `url(${label.image})`;
            // Add semi-transparent overlay to make text readable
            labelEl.style.boxShadow = 'inset 0 0 0 2000px rgba(255, 255, 255, 0.7)';
        }

        labelEl.innerHTML = `
            <div class="label-border-top" style="background-color: ${label.color}; height: 3mm;"></div>
            <div class="label-header">${label.title || 'SIN TÍTULO'}</div>
            <div class="label-body">${label.content || ''}</div>
            <div class="label-footer">
                <span>1.44 MB</span>
                <span>${label.date}</span>
            </div>
        `;
        
        // Add click to select
        labelEl.addEventListener('click', () => {
            elements.selector.value = i;
            state.selectedLabel = i;
            updateInputsFromState();
        });

        // Highlight selected
        if (state.selectedLabel === i) {
            labelEl.style.boxShadow = `inset 0 0 0 2000px rgba(255, 255, 255, 0.6), 0 0 10px ${label.color}`;
            labelEl.style.borderColor = label.color;
        }

        elements.labelsGrid.appendChild(labelEl);
    });
}

async function generatePDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const labelW = 70;
    const labelH = 43;
    const gapX = 10;
    const gapY = 5;
    
    // Calculate margins to center the 2x5 grid
    const totalW = (2 * labelW) + gapX;
    const totalH = (5 * labelH) + (4 * gapY);
    const startX = (210 - totalW) / 2;
    const startY = (297 - totalH) / 2;

    let count = 0;
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 2; col++) {
            const label = state.labels[count];
            const x = startX + (col * (labelW + gapX));
            const y = startY + (row * (labelH + gapY));

            // Background Image (if any)
            if (label.image) {
                // To keep white background readable, we'll draw a white semi-transparent rect over the image
                doc.addImage(label.image, 'JPEG', x, y, labelW, labelH);
                doc.saveGraphicsState();
                doc.setGState(new doc.GState({opacity: 0.7}));
                doc.setFillColor(255, 255, 255);
                doc.rect(x, y, labelW, labelH, 'F');
                doc.restoreGraphicsState();
            }

            // Draw Label Border (Rounded)
            doc.setDrawColor(0);
            doc.setLineWidth(label.lineWidth);
            if (label.cornerRadius > 0) {
                doc.roundedRect(x, y, labelW, labelH, label.cornerRadius, label.cornerRadius, 'D');
            } else {
                doc.rect(x, y, labelW, labelH, 'D');
            }

            // Draw Accent Top Bar (also rounded if needed)
            doc.setFillColor(label.color);
            if (label.cornerRadius > 0) {
                // Drawing a rounded rect that covers only the top part is tricky, 
                // we'll just draw a regular rect and clip it? Or just draw a smaller rounded rect.
                // Simpler: Draw a rounded rect at the top and then a square one to cover the bottom rounding if we want just top accent.
                // But user asked for rounded corners for the whole label.
                doc.roundedRect(x, y, labelW, 3, label.cornerRadius, label.cornerRadius, 'F');
                // Cover the bottom rounding of the 3mm bar to make it look like it continues down
                doc.rect(x, y + 1.5, labelW, 1.5, 'F');
            } else {
                doc.rect(x, y, labelW, 3, 'F');
            }

            // Draw Title
            doc.setTextColor(0);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(label.title.toUpperCase() || 'SIN TÍTULO', x + 4, y + 8);
            
            // Draw Separator Line
            doc.setLineWidth(0.1);
            doc.line(x + 4, y + 10, x + labelW - 4, y + 10);

            // Draw Body
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            const splitContent = doc.splitTextToSize(label.content, labelW - 8);
            doc.text(splitContent, x + 4, y + 15);

            // Draw Footer
            doc.setFontSize(7);
            doc.setTextColor(100);
            doc.line(x + 4, y + labelH - 5, x + labelW - 4, y + labelH - 5);
            doc.text('1.44 MB', x + 4, y + labelH - 2);
            doc.text(label.date, x + labelW - 4, y + labelH - 2, { align: 'right' });

            count++;
        }
    }

    doc.save('etiquetas-diskete-personalizadas.pdf');
}

init();
