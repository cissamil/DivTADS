import { useAuth } from '@/src/contexts/AuthContext';
import { useGroup } from '@/src/contexts/GroupContext';
import { useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
    visible: boolean;
    onCreate: (title:string, description:string, userId:string) => void;
    onClose: () => void;
}

export default function CreateGroupModal({ visible, onCreate, onClose }: Props) {
    const { userData } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);

    const handleCreate = async () => {
        
        if (!title.trim() || !userData?.userId || saving) return;
        try {
            setSaving(true);
            onCreate(title, description, userData.userId);
            setTitle('');
            setDescription('');
            onClose();
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível criar o grupo.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>Criar Grupo</Text>

                    <Text style={styles.label}>Nome do grupo *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Viagem para Dubai"
                        placeholderTextColor="#555"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, styles.inputMultiline]}
                        placeholder="Opcional"
                        placeholderTextColor="#555"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <TouchableOpacity
                        style={[styles.button, (!title.trim() || saving) && styles.buttonDisabled]}
                        onPress={handleCreate}
                        disabled={!title.trim() || saving}
                    >
                        {saving ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Criar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancelButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
    },
    label: {
        color: '#999',
        fontSize: 13,
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        color: '#fff',
        padding: 12,
        fontSize: 15,
        marginBottom: 16,
    },
    inputMultiline: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#6366f1',
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        color: '#999',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 16,
        paddingBottom: 8,
    },
});