import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUploader = ({
    onFileSelect,
    config = {
        allowedTypes: ['image/jpeg', 'image/png'],
        maxSizeMB: 2,
        enablePreview: true,
    },
}) => {
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!selectedFile || !config.enablePreview) return;

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedFile, config.enablePreview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setError(null);

        if (!file) return;

        const { allowedTypes, maxSizeMB } = config;

        if (!allowedTypes.includes(file.type)) {
            setError(`Allowed types: ${allowedTypes.join(', ')}`);
            e.target.value = '';
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File must be less than ${maxSizeMB} MB.`);
            e.target.value = '';
            return;
        }

        setSelectedFile(file);
        onFileSelect(file);
        e.target.value = '';
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onFileSelect(null);
    };

    const formatFileSize = (size) => (size / 1024 / 1024).toFixed(2) + ' MB';

    const styles = {
        uploadLabel: {
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            textAlign: 'center',
            marginTop: '12px',
        },
        hiddenInput: {
            display: 'none',
        },
        imageContainer: {
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '6px',
            position: 'relative',
        },
        image: {
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '6px',
            cursor: 'pointer',
        },
        fileInfo: {
            textAlign: 'left', 
            maxWidth: '100px',
            wordWrap: 'break-word',
        },
        fileName: {
            margin: 0,
            fontWeight: 'bold',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        fileSize: {
            margin: 0,
            fontSize: '12px',
            color: '#666',
        },
        removeBtn: {
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: '20px',
        },
    };

    return (
        <div>
            <label style={styles.uploadLabel}>
                Choose File
                <input
                    type="file"
                    accept={config.allowedTypes.join(',')}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={styles.hiddenInput}
                />
            </label>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {previewUrl && config.enablePreview && (
                <div style={styles.imageContainer}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={previewUrl}
                            alt="preview"
                            style={styles.image}
                            onClick={() => setShowModal(true)}
                        />
                        <div style={styles.removeBtn} onClick={removeImage}>
                            ×
                        </div>
                    </div>
                    <div style={styles.fileInfo}>
                        <p style={styles.fileName} title={selectedFile.name}>
                            {selectedFile.name}
                        </p>
                        <p style={styles.fileSize}>
                            {formatFileSize(selectedFile.size)}
                        </p>
                    </div>
                </div>
            )}

            {/* Modal for full image */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Full preview"
                            style={{ maxWidth: '100%', maxHeight: '80vh' }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default ImageUploader;
