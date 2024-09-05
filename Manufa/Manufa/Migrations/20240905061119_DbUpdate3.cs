using Microsoft.EntityFrameworkCore.Migrations;

namespace Manufa.Migrations
{
    public partial class DbUpdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Material_materialType_TypeId",
                table: "Material");

            migrationBuilder.DropPrimaryKey(
                name: "PK_materialType",
                table: "materialType");

            migrationBuilder.RenameTable(
                name: "materialType",
                newName: "MaterialType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MaterialType",
                table: "MaterialType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Material_MaterialType_TypeId",
                table: "Material",
                column: "TypeId",
                principalTable: "MaterialType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Material_MaterialType_TypeId",
                table: "Material");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MaterialType",
                table: "MaterialType");

            migrationBuilder.RenameTable(
                name: "MaterialType",
                newName: "materialType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_materialType",
                table: "materialType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Material_materialType_TypeId",
                table: "Material",
                column: "TypeId",
                principalTable: "materialType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
