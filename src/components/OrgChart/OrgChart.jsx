import { useMemo, useState, useRef, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useEmployees } from '../../context/EmployeeContext';
import { buildTree, filterEmployees, wouldCreateCircularReference } from '../../utils/treeHelpers';
import TreeNode from '../TreeNode/TreeNode';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import styles from './OrgChart.module.css';

export default function OrgChart() {
  const { employees, searchTerm, selectedTeam, updateEmployeeManager, loading } = useEmployees();
  const [activeId, setActiveId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const chartWrapperRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Filter employees based on search and team
  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, searchTerm, selectedTeam);
  }, [employees, searchTerm, selectedTeam]);

  // Build tree from filtered employees
  const tree = useMemo(() => {
    return buildTree(filteredEmployees);
  }, [filteredEmployees]);

  useEffect(() => {
  setPanOffset({ x: 0, y: 0 }); // re-center
}, [tree]);

  // Get all employee IDs for sortable context
  const employeeIds = useMemo(() => {
    return filteredEmployees.map(emp => emp.id);
  }, [filteredEmployees]);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum drag distance to activate
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const draggedEmployeeId = active.id;
    const newManagerId = over.id;

    // Check for circular reference
    if (wouldCreateCircularReference(employees, draggedEmployeeId, newManagerId)) {
      alert('Cannot create circular reporting structure!');
      return;
    }

    try {
      await updateEmployeeManager(draggedEmployeeId, newManagerId);
    } catch (error) {
      console.error('Failed to update employee manager:', error);
      alert('Failed to update employee manager. Please try again.');
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeEmployee = activeId
    ? employees.find(emp => emp.id === activeId)
    : null;

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2)); // Max 200%
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.1)); // Min 10%
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleResetView = () => {
    setPanOffset({ x: 0, y: 0 });
    setZoom(1);
  };

  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(prev => Math.max(0.1, Math.min(2, prev + delta)));
      }
    };

    const wrapper = chartWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
      return () => wrapper.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // Pan/drag functionality
  const handleMouseDown = (e) => {
    // Don't pan if clicking on employee cards or zoom controls
    if (e.target.closest('[data-draggable]') || e.target.closest('button')) {
      return;
    }
    setIsPanning(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPanStart({
      x: clientX - panOffset.x,
      y: clientY - panOffset.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const newOffset = {
      x: clientX - panStart.x,
      y: clientY - panStart.y,
    };
    setPanOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  useEffect(() => {
    if (isPanning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isPanning, panStart]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading organization chart...</div>
      </div>
    );
  }

  if (tree.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <h3>No employees found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    );
  }


return (
  <div className={styles.container}>

    <div className={styles.header}>
  <div className={styles.headerLeft}>
    <h2 className={styles.title}>Organization Chart</h2>
    <p className={styles.subtitle}>
      Drag and drop employees to change reporting structure
    </p>
  </div>

  <div className={styles.headerControls}>
    <button
      onClick={handleZoomOut}
      className={styles.zoomButton}
      disabled={zoom <= 0.1}
      title="Zoom Out"
    >
      −
    </button>

    <button
      onClick={handleResetZoom}
      className={styles.zoomReset}
      title="Reset Zoom"
    >
      {Math.round(zoom * 100)}%
    </button>

    <button
      onClick={handleZoomIn}
      className={styles.zoomButton}
      disabled={zoom >= 2}
      title="Zoom In"
    >
      +
    </button>

    <button
      onClick={handleResetView}
      className={styles.resetViewInline}
      title="Reset View"
    >
      ⟲
    </button>
  </div>
</div>
    <div
      className={styles.chartWrapper}
      ref={chartWrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      style={{ cursor: isPanning ? "grabbing" : "grab", position: "relative" }}
    >
      {/* DND AREA */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={employeeIds}>
          <div className={styles.treeOuter}>
            <div
              className={styles.treeContainer}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: `translateX(-50%) translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: "center top",
                willChange: "transform",
              }}
            >
              {tree.map((rootEmployee) => (
                <TreeNode key={rootEmployee.id} employee={rootEmployee} />
              ))}
            </div>
          </div>
        </SortableContext>

        <DragOverlay>
          {activeEmployee ? (
            <div className={styles.dragOverlay}>
              <EmployeeCard employee={activeEmployee} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  </div>
);

}
