import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Note } from '@/utils/interfaces';

interface NotesListProps {
    notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
    const [expandedNotes, setExpandedNotes] = useState<number[]>([]);

    const toggleExpand = (noteId: number) => {
        setExpandedNotes((prev) => {
            if (prev.includes(noteId)) {
                return prev.filter((id) => id !== noteId);
            }
            return [...prev, noteId];
        });
    };

    const renderNote = ({ item }: { item: Note }) => {
        const isExpanded = expandedNotes.includes(item.id);

        return (
            <View style={styles.noteContainer}>
                <Pressable
                    style={styles.noteHeader}
                    onPress={() => toggleExpand(item.id)}
                >
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <MaterialIcons
                        name={
                            isExpanded
                                ? 'keyboard-arrow-up'
                                : 'keyboard-arrow-down'
                        }
                        size={24}
                        color="#64867e"
                    />
                </Pressable>
                {isExpanded && (
                    <Text style={styles.noteDescription}>
                        {item.subtitle}
                    </Text>
                )}
            </View>
        );
    };

    return (
        <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    noteContainer: {
        backgroundColor: '#fff',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    noteDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default NotesList;
