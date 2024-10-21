import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    ListRenderItem,
    Pressable,
    KeyboardAvoidingView,
} from 'react-native';
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import {
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { FloatingAction } from 'react-native-floating-action';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import * as Progress from 'react-native-progress';

import { supabase } from '@/utils/supabase';
import { Project } from '@/utils/interfaces';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [milestoneName, setMilestoneName] = useState('');
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState('');
    const [isProjectModalVisible, setIsProjectModalVisible] =
        useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<
        number | null
    >(null);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const milestoneSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%'], []);
    const milestoneSheetSnapPoints = useMemo(() => ['50%'], []);
    const notesSheetModalRef = useRef<BottomSheetModal>(null);
    const notesSheetSnapPoints = useMemo(() => ['50%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePresentMilestoneModalPress = useCallback(() => {
        milestoneSheetModalRef.current?.present();
    }, []);

    const handlePresentNotesModalPress = useCallback(() => {
        notesSheetModalRef.current?.present();
    }, []);

    const fetchProjects = async () => {
        let { data } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        setProjects(data || []);
    };

    const addProject = async () => {
        const {
            data: { user: User },
        } = await supabase.auth.getUser();

        const newProject = {
            user_id: User?.id,
            title: project,
        };

        setLoading(true);
        const result = await supabase
            .from('projects')
            .insert(newProject)
            .select()
            .single();

        setProjects([result.data, ...projects]);
        setLoading(false);
        setProject('');
    };

    const addMilestone = async (projectId: number | null) => {
        const {
            data: { user: User },
        } = await supabase.auth.getUser();

        const newMilestone = {
            user_id: User?.id,
            name: milestoneName,
            project_id: projectId,
        };

        console.log(newMilestone);

        const result = await supabase
            .from('milestones')
            .insert(newMilestone)
            .select()
            .single();
        console.log(result);
        setMilestoneName('');
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const renderRow: ListRenderItem<Project> = ({ item }) => {
        return (
            <View style={styles.projectRow}>
                <View style={styles.projectContent}>
                    <View style={styles.projectHeader}>
                        <Text style={styles.projectTitle}>
                            {item.title}
                        </Text>
                        <Pressable
                            style={styles.expandButton}
                            onPress={() => {
                                console.log('delete');
                            }}
                        >
                            <AntDesign
                                name="arrowsalt"
                                size={20}
                                color="#64867e"
                            />
                        </Pressable>
                    </View>

                    <View style={styles.actionButtonsContainer}>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => {
                                handlePresentMilestoneModalPress();
                                setSelectedProjectId(item.id);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="map-marker-outline"
                                size={20}
                                color="#000"
                            />
                            <Text>Add Milestone</Text>
                        </Pressable>
                        <Pressable
                            style={styles.actionButton}
                            onPress={handlePresentNotesModalPress}
                        >
                            <MaterialCommunityIcons
                                name="note-plus-outline"
                                size={24}
                                color="#000"
                            />
                            <Text>Add Note</Text>
                        </Pressable>
                    </View>
                    <Progress.Bar
                        progress={item.progress}
                        width={200}
                        color={'#000'}
                        unfilledColor="#bbb7be"
                        borderWidth={0}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Your Learning Projects
            </Text>

            <FlatList data={projects} renderItem={renderRow} />
            <FloatingAction
                actions={[]}
                onPressMain={handlePresentModalPress}
                color={'#64867e'}
                showBackground={false}
            />

            <KeyboardAvoidingView behavior="height">
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={() => {}}
                >
                    <BottomSheetView style={styles.bottomSheetView}>
                        <BottomSheetTextInput
                            placeholder="Project Name"
                            style={styles.bottomSheetInput}
                            value={project}
                            onChangeText={setProject}
                        />
                        <Pressable
                            style={styles.addProjectButton}
                            onPress={addProject}
                            disabled={loading || project === ''}
                        >
                            <Text style={styles.addProjectButtonText}>
                                Add Project
                            </Text>
                        </Pressable>
                    </BottomSheetView>
                </BottomSheetModal>
                <BottomSheetModal
                    ref={milestoneSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={() => {}}
                >
                    <BottomSheetView style={styles.bottomSheetView}>
                        <BottomSheetTextInput
                            placeholder="Milestone Name"
                            style={styles.bottomSheetInput}
                            value={milestoneName}
                            onChangeText={setMilestoneName}
                        />
                        <Pressable
                            style={styles.addProjectButton}
                            onPress={() =>
                                addMilestone(selectedProjectId)
                            }
                        >
                            <Text style={styles.addProjectButtonText}>
                                Add Milestone
                            </Text>
                        </Pressable>
                    </BottomSheetView>
                </BottomSheetModal>
                <BottomSheetModal
                    ref={notesSheetModalRef}
                    index={1}
                    snapPoints={notesSheetSnapPoints}
                    onChange={() => {}}
                >
                    <BottomSheetView style={styles.bottomSheetView}>
                        <BottomSheetTextInput
                            placeholder="Note Title"
                            style={styles.bottomSheetInput}
                        />
                        <BottomSheetTextInput
                            placeholder="Note Description"
                            style={[
                                styles.bottomSheetInput,
                                styles.textArea,
                            ]}
                            multiline
                        />
                        <Pressable style={styles.addProjectButton}>
                            <Text style={styles.addProjectButtonText}>
                                Add Note
                            </Text>
                        </Pressable>
                    </BottomSheetView>
                </BottomSheetModal>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '500',
        paddingTop: 80,
        paddingHorizontal: 8,
        paddingBottom: 16,
    },
    projectRow: {
        backgroundColor: '#d9e4e6',
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 2,
    },
    projectContent: {
        flex: 1,
        gap: 8,
    },
    projectHeader: {
        flexDirection: 'row',
    },
    projectTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
    },
    expandButton: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 2,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 8,
        marginBottom: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        padding: 4,
        backgroundColor: '#fff',
        width: 140,
        elevation: 2,
        borderRadius: 8,
    },
    bottomSheetView: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
    },
    bottomSheetInput: {
        backgroundColor: '#fff',
        color: '#000',
        padding: 8,
        marginTop: 8,
        height: 48,
        borderWidth: 0.5,
        borderColor: '#808080',
        borderRadius: 8,
    },
    addProjectButton: {
        height: 48,
        borderRadius: 8,
        backgroundColor: '#64867e',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    addProjectButtonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    textArea: {
        height: 200,
    },
});

export default Projects;
