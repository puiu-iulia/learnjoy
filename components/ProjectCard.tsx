import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Project } from '@/utils/interfaces';

interface ProjectCardProps {
    project: Project;
    onPress?: () => void;
}

const ProjectCard = ({ project, onPress }: ProjectCardProps) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{project.title}</Text>
                <View style={styles.progressContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${project.progress}%` },
                        ]}
                    />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16,
        marginHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    progressContainer: {
        height: 4,
        marginTop: 8,
        backgroundColor: '#eee',
        borderRadius: 2,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#64867e',
        borderRadius: 2,
    },
});

export default ProjectCard;
