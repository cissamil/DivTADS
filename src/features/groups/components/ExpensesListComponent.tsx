import { Image, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { NumberFormatter } from '@/src/utils/NumberFormatter';
import { FlatList, View } from "react-native";
import { ExpenseComposition } from "../models/ExpenseComposition";
import { ExpensesListComponentStyle } from "./styles/GroupDetailsScreenStyle";
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ExpanseListProps {
    expenses: ExpenseComposition[];
    screenOption: 'ExtractScreen' | 'GroupDetailsScreen'
}

export default function ExpensesListComponent({ expenses, screenOption }: ExpanseListProps) {

    const insets = useSafeAreaInsets();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const formatedValue = (value: number) => {
        return NumberFormatter.formatToMoney(value);
    }

    const hasReceipt = (receipt_url?: string | null) => {
        return !!receipt_url;
    }

    const openReceipt = (url: string) => {
        setSelectedImage(url);
        setModalVisible(true);
    }

    const closeReceipt = () => {
        setModalVisible(false);
        setSelectedImage(null);
    }

    return (

        <>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.expenseId}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 30,
                    paddingTop: 10
                }}
                renderItem={({ item }) => (
                    <View style={ExpensesListComponentStyle.cardItem}>
                        <View>
                            <Text style={ExpensesListComponentStyle.itemTitle}>{item.description}</Text>
                            {
                                screenOption == 'ExtractScreen' ? (
                                    <View>
                                        <Text style={ExpensesListComponentStyle.itemSubtitle}>Grupo: {item.groupName}</Text>
                                    </View>
                                ) : (

                                    <View>
                                        <Text style={ExpensesListComponentStyle.itemSubtitle}>Pago por {item.memberName}</Text>
                                    </View>
                                )
                            }

                            {
                                hasReceipt(item.receiptUrl) && (
                                    // 3. O clique agora passa a URL exata do item para a nossa função
                                    <TouchableOpacity onPress={() => openReceipt(item.receiptUrl as string)}>
                                        <Text style={{ color: '#6366f1', marginTop: 4, textDecorationLine: 'underline' }}>
                                            Ver comprovante
                                        </Text>
                                    </TouchableOpacity>
                                )

                            }
                        </View>

                        <Text style={ExpensesListComponentStyle.itemAmount}>{formatedValue(item.totalAmount)}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={ExpensesListComponentStyle.emptyText}>Nenhuma despesa registrada ainda.</Text>
                }
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeReceipt}
            >
                <View style={styles.modalBackground}>
                    <TouchableOpacity style={styles.closeArea} onPress={closeReceipt} />

                    <View style={styles.imageContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeReceipt}>
                            <Text style={styles.closeButtonText}>Fechar (X)</Text>
                        </TouchableOpacity>

                        {selectedImage && (
                            <Image
                                source={{ uri: selectedImage }}
                                style={styles.fullImage}
                                resizeMode="contain"
                            />
                        )}
                    </View>

                    <TouchableOpacity style={styles.closeArea} onPress={closeReceipt} />
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeArea: {
        flex: 1,
        width: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '90%',
        height: '100%',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: -40,
        right: 20,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 8,
        zIndex: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});